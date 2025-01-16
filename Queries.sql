SELECT engine, support FROM information_schema.engines ORDER BY engine


CREATE TABLE my_table(
    column_list
) ENGINE = engine_name

CREATE TABLE my_table(
    column_list
) ENGINE = engine_name


1. Retrieve all operational trucks
2. Find dirvers with more than 5 chars in their name

select * from driver where len(name) > 5


3. List all maintenance record with truck model details 

SELECT maintenance.id, truck.model, maintenance.serviceDate, maintenance.serviceType
FROM maintenance
JOIN truck on maintenance.truckId = truck.id

4. Retrieve routes ending in a specific location 

SELECT * FROM route where endLocation = 'location_name'

5. Insert queries 


6. Update Queries

Update the status of a truck 
change the license number for a driver

7. JOIN 

a. Get a list of maintenance activities along with the truck model and status 

SELECT maintenance.id, truck.model, truck.status maintenance.serviceDate, maintenance.serviceType
FROM maintenance
JOIN truck on maintenance.truckId = truck.id


b. Retrieve drivers assigned to routes (hypothentical future relationship scenario)
    Assume a driver_route table links driver and Route


SELECT driver.name, router.statrtLocation , route.endLocation
FROM driver 
JOIN driverRoute on drive.id = driverRoute.driverId
JOIN route ON driverRoute.routeId = route.id;

8. Count the number of maintenance record for each truck 

SELECT truck.model, count(maintenance.id) AS maintenanceCount
FROM truck
LEFT JOIN maintenance ON truck.id = maintenance.truckId
GROUP  BY  truck.model

-   Find trucks with no maintenance records
-   Retrieve the latest maintenance activity for each truck  

SELECT truck.model, MAX(maintenance.serviceDate) AS latestServiceDate 
FROM truck
JOIN maintenance ON truck.id = maintenance.truckId
Group BY truck.model 



