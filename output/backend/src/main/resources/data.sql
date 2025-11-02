-- COBOL Airlines System - Sample Data

-- Departments
INSERT INTO department (deptid, name, empid_director) VALUES
(1, 'CEO', NULL),
(2, 'Flight Crew', NULL),
(3, 'Ground Crew', NULL),
(4, 'Maintenance Crew', NULL),
(5, 'Human Resources', NULL),
(6, 'IT', NULL),
(7, 'Sales', NULL),
(8, 'Legal', NULL),
(9, 'Schedule', NULL);

-- Employees
INSERT INTO employee (empid, firstname, lastname, address, city, zipcode, telephone, email, admin_date, salary, deptid) VALUES
('EMP00001', 'John', 'Doe', '123 Main Street', 'Paris', '75001', '0123456789', 'john.doe@airlines.com', '2024-01-15', 50000.00, 7),
('EMP00002', 'Jane', 'Smith', '456 Oak Avenue', 'Paris', '75002', '0123456790', 'jane.smith@airlines.com', '2024-02-20', 55000.00, 5),
('EMP00003', 'Bob', 'Johnson', '789 Pine Road', 'Paris', '75003', '0123456791', 'bob.johnson@airlines.com', '2024-03-10', 60000.00, 6),
('EMP00004', 'Alice', 'Williams', '321 Elm Street', 'Paris', '75004', '0123456792', 'alice.williams@airlines.com', '2024-04-05', 52000.00, 7),
('EMP00005', 'Charlie', 'Brown', '654 Maple Drive', 'Paris', '75005', '0123456793', 'charlie.brown@airlines.com', '2024-05-12', 48000.00, 7);

-- Airports
INSERT INTO airport (airportid, name, address, city, country, zipcode) VALUES
('CDG', 'Charles de Gaulle Airport', '95700 Roissy-en-France', 'Paris', 'France', '95700'),
('FCO', 'Leonardo da Vinci Airport', '00054 Fiumicino', 'Rome', 'Italy', '00054'),
('LHR', 'Heathrow Airport', 'TW6 1EW', 'London', 'United Kingdom', 'TW6 1EW'),
('JFK', 'John F. Kennedy International Airport', 'Queens, NY 11430', 'New York', 'United States', '11430'),
('NRT', 'Narita International Airport', 'Narita, Chiba 282-0004', 'Tokyo', 'Japan', '282-0004');

-- Airplanes
INSERT INTO airplane (airplaneid, type, num_seats, fuel_capacity) VALUES
('BOEING01', '737-800', 189, 26000),
('BOEING02', '737-900', 220, 30000),
('AIRBUS01', 'A320', 180, 23800),
('AIRBUS02', 'A321', 220, 30000),
('BOEING03', '787-8', 242, 126000);

-- Shifts
INSERT INTO shift (shiftid, shift_date, start_time, end_time, equipeid) VALUES
(1, '2025-11-15', '08:00:00', '16:00:00', 1),
(2, '2025-11-15', '16:00:00', '00:00:00', 2),
(3, '2025-11-16', '08:00:00', '16:00:00', 1),
(4, '2025-11-16', '16:00:00', '00:00:00', 2),
(5, '2025-11-17', '08:00:00', '16:00:00', 1);

-- Flights
INSERT INTO flight (flightid, flight_date, dep_time, arr_time, tot_pass, tot_baggage, flightnum, shiftid, airplaneid, airport_dep, airport_arr) VALUES
(1, '2025-11-15', '10:00:00', '12:30:00', 150, 200, 'CB1104', 1, 'BOEING01', 'CDG', 'FCO'),
(2, '2025-11-15', '14:00:00', '17:30:00', 180, 250, 'CB1105', 1, 'AIRBUS01', 'FCO', 'CDG'),
(3, '2025-11-16', '09:00:00', '11:00:00', 160, 210, 'CB2204', 3, 'BOEING02', 'CDG', 'LHR'),
(4, '2025-11-16', '15:00:00', '17:00:00', 175, 230, 'CB2205', 3, 'AIRBUS02', 'LHR', 'CDG'),
(5, '2025-11-17', '11:00:00', '14:30:00', 190, 260, 'CB3304', 5, 'BOEING03', 'CDG', 'JFK');

-- Passengers
INSERT INTO passenger (clientid, firstname, lastname, address, city, country, zipcode, telephone, email) VALUES
(1001, 'Maxime', 'Duprat', '10 Rue de la Paix', 'Paris', 'France', '75001', '+33123456789', 'maxime.duprat@email.com'),
(1002, 'Sophie', 'Martin', '25 Avenue des Champs', 'Paris', 'France', '75008', '+33123456790', 'sophie.martin@email.com'),
(1003, 'Pierre', 'Dubois', '15 Boulevard Saint-Germain', 'Paris', 'France', '75006', '+33123456791', 'pierre.dubois@email.com'),
(1004, 'Marie', 'Lefebvre', '8 Rue de Rivoli', 'Paris', 'France', '75004', '+33123456792', 'marie.lefebvre@email.com'),
(1005, 'Jean', 'Bernard', '30 Rue de Vaugirard', 'Paris', 'France', '75015', '+33123456793', 'jean.bernard@email.com'),
(1006, 'Isabelle', 'Moreau', '12 Place Vendome', 'Paris', 'France', '75001', '+33123456794', 'isabelle.moreau@email.com'),
(1007, 'Luc', 'Petit', '45 Rue de la Republique', 'Lyon', 'France', '69001', '+33456789123', 'luc.petit@email.com'),
(1008, 'Camille', 'Roux', '22 Cours Mirabeau', 'Aix-en-Provence', 'France', '13100', '+33456789124', 'camille.roux@email.com');

-- Transactions
INSERT INTO transaction (achatid, purchase_date, purchase_time, price, employeeid, clientid) VALUES
(5001, '2025-11-02', '10:30:00', 241.98, 'EMP00001', 1001),
(5002, '2025-11-02', '11:15:00', 120.99, 'EMP00004', 1002),
(5003, '2025-11-02', '14:20:00', 362.97, 'EMP00001', 1003);

-- Tickets
INSERT INTO ticket (ticketid, buyid, clientid, flightid, seatnum) VALUES
('TKT0000001', 5001, 1001, 1, '12A'),
('TKT0000002', 5001, 1001, 1, '12B'),
('TKT0000003', 5002, 1002, 1, '15C'),
('TKT0000004', 5003, 1003, 2, '8A'),
('TKT0000005', 5003, 1003, 2, '8B'),
('TKT0000006', 5003, 1003, 2, '8C');

