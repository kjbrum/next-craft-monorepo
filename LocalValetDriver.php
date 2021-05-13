<?php

class LocalValetDriver extends CraftValetDriver
{
    /**
     * Determine if the driver serves the request.
     *
     * @param  string  $sitePath
     * @param  string  $siteName
     * @param  string  $uri
     * @return bool
     */
    public function serves($sitePath, $siteName, $uri)
    {
        if (file_exists($sitePath.'/backend') && file_exists($sitePath.'/frontend')) {
            return true;
        }

        return false;
    }

    /**
     * Determine the name of the directory where the front controller lives.
     *
     * @param  string  $sitePath
     * @return string
     */
    public function frontControllerDirectory($sitePath)
    {
        $dirs = ['web', 'public', 'public_html'];

        foreach ($dirs as $dir) {
            if (is_dir($sitePath.'/backend/'.$dir)) {
                return 'backend/'.$dir;
            }
        }

        // Give up, and just return the default
        return 'backend/web';
    }
}
