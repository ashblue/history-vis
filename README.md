Setup Instructions
===========

1. Install packages from the root (first time only). Might take a while depending upon your connection.

        npm install

2. Build the JavaScript application via Browserify. Note that it will automatically listen for changes and 
re-build the script as long as you keep it running.

        ./build.sh

    Note that you may have to modify your system to own the ./build.sh if an error fires
    
        sudo chmod 755 build.sh

3. Open another terminal and run the following to boot up your server.

        noder server.js
        
4. Navigating to localhost:8080 to see it in action.