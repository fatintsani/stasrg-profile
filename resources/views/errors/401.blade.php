@extends('errors.layout')

@section('code', '401')
@section('type', 'Unauthorized')
@section('title', 'Autentikasi Diperlukan')
@section('image', '/assets/icon/errors/autentikasi.png')
@section('message', 'Anda memerlukan kredensial peneliti yang valid untuk mengakses sumber daya riset ini. Silakan masuk terlebih dahulu.')

@section('actions')
    <a href="/login" class="btn-primary" style="background:#1AC13B;">Masuk ke Portal</a>
@endsection
