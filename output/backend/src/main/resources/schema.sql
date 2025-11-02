-- COBOL Airlines System - PostgreSQL Schema

-- Department Table
CREATE TABLE IF NOT EXISTS department (
    deptid SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    empid_director VARCHAR(8)
);

-- Employee Table
CREATE TABLE IF NOT EXISTS employee (
    empid VARCHAR(8) PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    address VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    zipcode VARCHAR(15) NOT NULL,
    telephone VARCHAR(10) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    admin_date DATE NOT NULL,
    salary NUMERIC(8,2) NOT NULL,
    deptid INTEGER NOT NULL,
    FOREIGN KEY (deptid) REFERENCES department(deptid)
);

CREATE INDEX idx_employee_deptid ON employee(deptid);
CREATE INDEX idx_employee_email ON employee(email);

-- Passenger Table
CREATE TABLE IF NOT EXISTS passenger (
    clientid SERIAL PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    address VARCHAR(250) NOT NULL,
    city VARCHAR(50) NOT NULL,
    country VARCHAR(30) NOT NULL,
    zipcode VARCHAR(15) NOT NULL,
    telephone VARCHAR(18) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE INDEX idx_passenger_email ON passenger(email);
CREATE INDEX idx_passenger_name ON passenger(firstname, lastname);

-- Airport Table
CREATE TABLE IF NOT EXISTS airport (
    airportid VARCHAR(4) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(250) NOT NULL,
    city VARCHAR(30) NOT NULL,
    country VARCHAR(30) NOT NULL,
    zipcode VARCHAR(15) NOT NULL
);

-- Airplane Table
CREATE TABLE IF NOT EXISTS airplane (
    airplaneid VARCHAR(8) PRIMARY KEY,
    type VARCHAR(8) NOT NULL,
    num_seats INTEGER NOT NULL,
    fuel_capacity INTEGER NOT NULL
);

-- Shift Table (simplified)
CREATE TABLE IF NOT EXISTS shift (
    shiftid SERIAL PRIMARY KEY,
    shift_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    equipeid INTEGER
);

-- Flight Table
CREATE TABLE IF NOT EXISTS flight (
    flightid SERIAL PRIMARY KEY,
    flight_date DATE NOT NULL,
    dep_time TIME NOT NULL,
    arr_time TIME NOT NULL,
    tot_pass INTEGER NOT NULL,
    tot_baggage INTEGER NOT NULL,
    flightnum VARCHAR(6) NOT NULL,
    shiftid INTEGER NOT NULL,
    airplaneid VARCHAR(8) NOT NULL,
    airport_dep VARCHAR(4) NOT NULL,
    airport_arr VARCHAR(4) NOT NULL,
    FOREIGN KEY (shiftid) REFERENCES shift(shiftid),
    FOREIGN KEY (airplaneid) REFERENCES airplane(airplaneid),
    FOREIGN KEY (airport_dep) REFERENCES airport(airportid),
    FOREIGN KEY (airport_arr) REFERENCES airport(airportid)
);

CREATE INDEX idx_flight_flightnum ON flight(flightnum);
CREATE INDEX idx_flight_flightdate ON flight(flight_date);
CREATE INDEX idx_flight_airports ON flight(airport_dep, airport_arr);
CREATE INDEX idx_flight_airplaneid ON flight(airplaneid);

-- Transaction Table
CREATE TABLE IF NOT EXISTS transaction (
    achatid SERIAL PRIMARY KEY,
    purchase_date DATE NOT NULL,
    purchase_time TIME NOT NULL,
    price NUMERIC(7,2) NOT NULL,
    employeeid VARCHAR(8) NOT NULL,
    clientid INTEGER NOT NULL,
    FOREIGN KEY (employeeid) REFERENCES employee(empid),
    FOREIGN KEY (clientid) REFERENCES passenger(clientid)
);

CREATE INDEX idx_transaction_employeeid ON transaction(employeeid);
CREATE INDEX idx_transaction_clientid ON transaction(clientid);

-- Ticket Table
CREATE TABLE IF NOT EXISTS ticket (
    ticketid VARCHAR(10) PRIMARY KEY,
    buyid INTEGER NOT NULL,
    clientid INTEGER NOT NULL,
    flightid INTEGER NOT NULL,
    seatnum VARCHAR(3) NOT NULL,
    FOREIGN KEY (buyid) REFERENCES transaction(achatid),
    FOREIGN KEY (clientid) REFERENCES passenger(clientid),
    FOREIGN KEY (flightid) REFERENCES flight(flightid),
    UNIQUE(flightid, seatnum)
);

CREATE INDEX idx_ticket_buyid ON ticket(buyid);
CREATE INDEX idx_ticket_clientid ON ticket(clientid);
CREATE INDEX idx_ticket_flightid ON ticket(flightid);
CREATE INDEX idx_ticket_seatnum ON ticket(seatnum);

