@extends('errors.layout')

@section('code', '503')
@section('type', 'Service Unavailable')
@section('title', 'Sedang Dalam Pemeliharaan')
@section('image', '/assets/icon/errors/pemeliharaan.png')
@section('message', 'Kami sedang melakukan pemeliharaan dan peningkatan infrastruktur server secara berkala. Layanan akan segera kembali aktif.')

@section('actions')
    <button onclick="window.location.reload()" class="btn-primary" style="background:#1AC13B;">Cek Status Kembali</button>
@endsection
