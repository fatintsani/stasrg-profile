@extends('errors.layout')

@section('code', '429')
@section('type', 'Too Many Requests')
@section('title', 'Terlalu Banyak Permintaan')
@section('image', '/assets/icon/errors/terlalubanyakpermintaan.png')
@section('message', 'Sistem mendeteksi terlalu banyak permintaan dalam waktu singkat. Harap tunggu beberapa saat sebelum mencoba kembali.')

@section('actions')
    <button onclick="window.location.reload()" class="btn-primary" style="background:#1AC13B;">Muat Ulang</button>
@endsection
