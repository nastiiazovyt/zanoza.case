<?php
function mix($source)
{
    $fileName = $_SERVER['DOCUMENT_ROOT'] . '/mix-manifest.json';
    if ( ! file_exists($fileName)) {
        return $source;
    }
    $manifest = json_decode(file_get_contents($fileName), true);

    return isset($manifest[$source]) ? $manifest[$source] : $source;
}