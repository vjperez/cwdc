** When to use = and when to use IN ...


dvdrental=# SELECT title, description FROM film WHERE film_id = 
				(SELECT film_id FROM inventory WHERE inventory_id = 
				(SELECT inventory_id FROM rental WHERE rental_id IN  
				(SELECT rental_id FROM rental WHERE 
						extract(year FROM rental_date) = 2005 AND extract(month FROM rental_date) = 8 AND extract(day FROM rental_date) = 22) AND 
						customer_id IN (SELECT customer_id FROM customer WHERE first_name = 'Laura')));
    title     |                                                  description
--------------+---------------------------------------------------------------------------------------------------------------
 Whale Bikini | A Intrepid Story of a Pastry Chef And a Database Administrator who must Kill a Feminist in A MySQL Convention
(1 row)





dvdrental=# SELECT title, description FROM film WHERE film_id = (SELECT film_id FROM inventory WHERE inventory_id = (SELECT inventory_id FROM rental WHERE rental_id IN  (SELECT rental_id FROM rental WHERE extract(year FROM rental_date) = 2005 AND extract(month FROM rental_date) = 8 AND extract(day FROM rental_date) = 22) AND customer_id IN (SELECT customer_id FROM customer WHERE first_name LIKE 'L%')));
ERROR:  una subconsulta utilizada como expresión retornó más de un registro



dvdrental=# SELECT title, description FROM film WHERE film_id IN 
				(SELECT film_id FROM inventory WHERE inventory_id IN 
				(SELECT inventory_id FROM rental WHERE rental_id IN  
				(SELECT rental_id FROM rental WHERE 
						extract(year FROM rental_date) = 2005 AND extract(month FROM rental_date) = 8 AND extract(day FROM rental_date) = 22) AND
						customer_id IN (SELECT customer_id FROM customer WHERE first_name LIKE 'L%')));
           title           |                                                       description
---------------------------+-------------------------------------------------------------------------------------------------------------------------
 Sleuth Orient             | A Fateful Character Study of a Husband And a Dog who must Find a Feminist in Ancient India
 Notorious Reunion         | A Amazing Epistle of a Woman And a Squirrel who must Fight a Hunter in A Baloon
 Goldmine Tycoon           | A Brilliant Epistle of a Composer And a Frisbee who must Conquer a Husband in The Outback
 Rush Goodfellas           | A Emotional Display of a Man And a Dentist who must Challenge a Squirrel in Australia
 Satisfaction Confidential | A Lacklusture Yarn of a Dentist And a Butler who must Meet a Secret Agent in Ancient China
 Rocky War                 | A Fast-Paced Display of a Squirrel And a Explorer who must Outgun a Mad Scientist in Nigeria
 Room Roman                | A Awe-Inspiring Panorama of a Composer And a Secret Agent who must Sink a Composer in A Shark Tank
 Human Graffiti            | A Beautiful Reflection of a Womanizer And a Sumo Wrestler who must Chase a Database Administrator in The Gulf of Mexico
 Sleeping Suspects         | A Stunning Reflection of a Sumo Wrestler And a Explorer who must Sink a Frisbee in A MySQL Convention
 Cider Desire              | A Stunning Character Study of a Composer And a Mad Cow who must Succumb a Cat in Soviet Georgia
 Annie Identity            | A Amazing Panorama of a Pastry Chef And a Boat who must Escape a Woman in An Abandoned Amusement Park
 Driver Annie              | A Lacklusture Character Study of a Butler And a Car who must Redeem a Boat in An Abandoned Fun House
 Hours Rage                | A Fateful Story of a Explorer And a Feminist who must Meet a Technical Writer in Soviet Georgia
 Perfect Groove            | A Thrilling Yarn of a Dog And a Dog who must Build a Husband in A Baloon
 Hope Tootsie              | A Amazing Documentary of a Student And a Sumo Wrestler who must Outgun a A Shark in A Shark Tank
 Whale Bikini              | A Intrepid Story of a Pastry Chef And a Database Administrator who must Kill a Feminist in A MySQL Convention
 Swarm Gold                | A Insightful Panorama of a Crocodile And a Boat who must Conquer a Sumo Wrestler in A MySQL Convention
 Paradise Sabrina          | A Intrepid Yarn of a Car And a Moose who must Outrace a Crocodile in A Manhattan Penthouse
 Lady Stage                | A Beautiful Character Study of a Woman And a Man who must Pursue a Explorer in A U-Boat
 Giant Troopers            | A Fateful Display of a Feminist And a Monkey who must Vanquish a Monkey in The Canadian Rockies
 Rock Instinct             | A Astounding Character Study of a Robot And a Moose who must Overcome a Astronaut in Ancient India
 Pianist Outfield          | A Intrepid Story of a Boy And a Technical Writer who must Pursue a Lumberjack in A Monastery
 Bulworth Commandments     | A Amazing Display of a Mad Cow And a Pioneer who must Redeem a Sumo Wrestler in The Outback
 Redemption Comforts       | A Emotional Documentary of a Dentist And a Woman who must Battle a Mad Scientist in Ancient China
 Ishtar Rocketeer          | A Astounding Saga of a Dog And a Squirrel who must Conquer a Dog in An Abandoned Fun House
 Massacre Usual            | A Fateful Reflection of a Waitress And a Crocodile who must Challenge a Forensic Psychologist in California
 Robbers Joon              | A Thoughtful Story of a Mad Scientist And a Waitress who must Confront a Forensic Psychologist in Soviet Georgia
 Barefoot Manchurian       | A Intrepid Story of a Cat And a Student who must Vanquish a Girl in An Abandoned Amusement Park
 Christmas Moonshine       | A Action-Packed Epistle of a Feminist And a Astronaut who must Conquer a Boat in A Manhattan Penthouse
 Bingo Talented            | A Touching Tale of a Girl And a Crocodile who must Discover a Waitress in Nigeria
 Alamo Videotape           | A Boring Epistle of a Butler And a Cat who must Fight a Pastry Chef in A MySQL Convention
(31 rows)