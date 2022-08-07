# Chat-App
Multiple users can join any room of their choice and chat with all the people in the room at once. This is similar to group chatting in other messaging applications, 
but does not have any restrictions over the users that join any room... Users can not only send messages, but also they can share their present location with all 
the members in that room.
_________________________________________________________________________________________________________________________________________________________________________

PRE-REQUISITES TO RUN THE APP:
-----------------------------
  -> nodejs.

STEPS TO RUN THE APP:
---------------------
  -> To run this application in your local machine, go to Chat-App/src
  -> Run "node index.js" in terminal/shell.
  -> A port number will be displayed in the terminal.
  -> Open browser and open the following link "http://localhost:port_number" . port_number must be replaced with the displayed port number.
    (mostly express servers are run on port : 3000)
  
Modules used in the project:
----------------------------------
  => express - host server locally.
  => http - host express server using http protocol.
  => socket.io - establishing communication between front-end and back-end express server by emitting and receiving events.
