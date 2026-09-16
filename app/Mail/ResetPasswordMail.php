<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $resetUrl;
    public string $userName;
    public string $userEmail;
    public string $ipAddress;
    public string $requestedAt;
    public int $expiresInMinutes;

    /**
     * Create a new message instance.
     */
    public function __construct(
        User $user,
        string $token,
        string $ipAddress = '127.0.0.1',
        int $expiresInMinutes = 60
    ) {
        $this->userName = $user->name;
        $this->userEmail = $user->email;
        $this->resetUrl = url(route('password.reset', [
            'token' => $token,
            'email' => $user->email,
        ], false));
        $this->ipAddress = $ipAddress;
        $this->requestedAt = now()->format('Y-m-d H:i:s T');
        $this->expiresInMinutes = $expiresInMinutes;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Security Notice: Password Reset Request | CoE STAS-RG Telkom University',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.reset_password',
            with: [
                'resetUrl' => $this->resetUrl,
                'userName' => $this->userName,
                'userEmail' => $this->userEmail,
                'ipAddress' => $this->ipAddress,
                'requestedAt' => $this->requestedAt,
                'expiresInMinutes' => $this->expiresInMinutes,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
