Setup Instructions
===========

1. Install packages from the root (first time only)
    npm install

2. Build the JavaScript application via Browserify
    ./build.sh

    Note that you may have to modify your system to own the ./build.sh if an error fires
    sudo chmod 755 build.sh

3. Open another terminal and run the following to boot up the server
    noder server.js