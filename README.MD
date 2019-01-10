# Perch Interactive Take Home Coding Challenge

1. Implement a simple Express server in node.js that connects (via websockets) two separate front-end apps A and B, both written in vanilla javascript.

2. For App A, within an area of 500x500 pixels, the cursor should leave a simple trail based on its position, sampled 10 times person second. It should also report the cursor position with a timestamp to the node server. Bonus: have a little fun with the trail left by the cursor.

3. The node server should write the mouse data received to a text file AND forward that data on to App B.

3. On initialization, App B should create 10 randomly positioned rectangular regions within a 500x500 pixel envelope. Based upon the data received from the node server, App B should display the same trail as shown in App A and per region it should display (a) an indication of whether the mouse is inside the region (b) the current speed of the cursor moving through each region and (c) the average speed of the cursor moving through each region since the app was launched. If there is no cursor within a region, the current speed within that region should be reported as zero.

4. As a special bonus feature, App B should have a "Request a Replay" button. Upon pressing this button, the node server will then send over all the data captured in its text file and App B should replay the entire sequence at 10x speed.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
NodeJS
NPM
```

### Getting Started

Run

```
npm i
```

to install and then

```
npm start
```
to run


## Running the tests

visit

```
localhost:3000/A
```
to access App A

and visit

```
localhost:3000/B
```
to access App B.


Enjoy,
Moshe