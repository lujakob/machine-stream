# MachineStream

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.7.

## Docker

Use docker commands to run this project

Build image with
 
`docker build -t machine-stream .`

Spin up container from your image

`docker run -p 80:80 --name angular-container -d machine-stream`

Or use docker-compose

`docker-compose up`

Open browser http://localhost:80 to see website in action!

## Website content

/machines
* displays a list of machines
* click on a list item navigates to the detail page

/machines/:id
* shows machine detail data
* shows list of latest events (data from API)
* a socket stream updates events realtime
* incoming events are added to top of events list
* incoming event updates the "status" of machine data

!! Events are filtered by machine_id. For this reason  there is hardly any event coming in that matches the id of the current machine displayed. To see some events being added, this filter can be disabled in machine.service.ts line 37 `debugDisableMachineIdFilter` - this only works running the app locally with `ng serve` of course (or restarting the whole docker process)
