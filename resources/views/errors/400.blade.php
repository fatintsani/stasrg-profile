@extends('errors.layout')

@section('code', '400')
@section('type', 'Bad Request')
@section('title', 'Permintaan Tidak Valid')
@section('image', '/assets/icon/errors/tidakvalid.png')
@section('message', 'Permintaan Anda tidak dapat diproses oleh server karena format data atau parameter yang dikirim tidak valid.')
