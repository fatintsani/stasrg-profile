@extends('errors.layout')

@section('code', '500')
@section('type', 'Server Error')
@section('title', 'Kesalahan Server')
@section('image', '/assets/icon/errors/kesalahanserver.png')
@section('message', 'Terjadi gangguan tak terduga pada server penelitian kami. Tim teknis CoE STAS-RG telah menerima laporan dan sedang menanganinya.')

@section('actions')
    <button onclick="window.location.reload()" class="btn-primary" style="background:#1AC13B;">Muat Ulang Halaman</button>
@endsection
