<?php
namespace Dotpulse\Basic\TypoScript;

use TYPO3\Flow\Annotations as Flow;
use TYPO3\TypoScript\TypoScriptObjects\AbstractTypoScriptObject;
use TYPO3\Flow\Utility;

class HashFileImplementation extends AbstractTypoScriptObject
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
