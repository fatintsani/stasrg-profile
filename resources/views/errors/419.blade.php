@extends('errors.layout')

@section('code', '419')
@section('type', 'Page Expired')
@section('title', 'Sesi Kedaluwarsa')
@section('image', '/assets/icon/errors/sesikedaluwarsa.png')
@section('message', 'Token keamanan sesi Anda telah kedaluwarsa demi melindungi integritas data. Silakan muat ulang halaman.')

@section('actions')
    <button onclick="window.location.reload()" class="btn-primary" style="background:#1AC13B;">Muat Ulang Halaman</button>
@endsection
