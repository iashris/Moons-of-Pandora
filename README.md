# Moons-of-Pandora
A Twitter bot that continuously creates images of fictional moons with fictional descriptions and posts them on Twitter (at https://twitter.com/moonmaking)

## Steps

1. Edit the config.js file to enter credentials of your Twitter App.

2. Deploy a Linux application (for 64 bit) from the Processing sketch.

3. Set up a remote Ubuntu 14 on Amazon EC2 server.

4. Set up java on the machine (Java 7) after setting up apt-get.

5. Transfer the files via FTP server.

6. Launch the instance with npm start and make it run forever with the npm forever.

7. The application should tweet a moon as soon as it runs.
