-- This file is for scheduled events to maintain MySQL
CREATE EVENT finish_sale
ON SCHEDULE EVERY 1 HOUR 
DO
    UPDATE deal SET finish_time = CURRENT_TIMESTAMP where send_time = DATE_SUB(CURDATE(), INTERVAL 10 DAY)