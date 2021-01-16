<?php require_once  $_SERVER['DOCUMENT_ROOT'].'/mix.php'?><!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="<?= mix('/assets/css/main.css') ?>">
    <title>Wings</title>

    <script>
        function createScript(src) {
            var s = document.createElement('script');
            s.defer = true;
            s.src = src;
            document.body.appendChild(s);
        }
    </script>
</head>
<body>
