# VidControl
Interactive HTML5 Video Experiment

## Video File Formats
MP4 and WebM formats don't work as smoothly as OGG Vorbis (.ogv).  To create high quality ogv's, use the following (on OS X):

```
brew install --with-theora --with-libvorbis ffmpeg
ffmpeg -i test.mov -c:v libtheora -c:a libvorbis -q:v 10 -q:a 10 test.ogv

```
