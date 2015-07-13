<?php

function base64DataUri($sFile)
{                   

    // Switch to right MIME-type
    $sExt = strtolower(substr(strrchr($sFile, '.'), 1));
     
    switch($sExt)
    {
        case 'gif':
        case 'jpg':
        case 'png':
            $sMimeType = 'image/'. $sExt;
        break;
        
        case 'ico':
            $sMimeType = 'image/x-icon';
        break;
        
        case 'eot':
            $sMimeType = 'application/vnd.ms-fontobject';
        break;
        case 'ttf': 
             $sMimeType = 'application/font-ttf';
        
        break;
        case 'otf':
            $sMimeType='font/opentype';
        break;
        case 'woff':
            $sMimeType = 'application/font-woff';
        break;
        
        default:
            exit('Invalid extension file!');
    }

    $sBase64 = base64_encode(file_get_contents($sFile));
    return "data:".$sMimeType.";charset=utf-8;base64,".$sBase64;
}



?>