<?php
namespace Dotpulse\Basic\TypoScript;

use Neos\Flow\Annotations as Flow;
use Neos\Fusion\FusionObjects\AbstractFusionObject;
use Neos\Utility;

class HashFileImplementation extends AbstractFusionObject
{
    public function evaluate()
    {
        $filePath = $this->tsValue('file');
        if ($filePath) {
            $fileContent = Utility\Files::getFileContents($filePath);
            return md5($fileContent);
        }

        return false;
    }
}
