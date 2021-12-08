-- This file is for scheduled events to maintain MySQL
CREATE EVENT finish_sale
ON SCHEDULE EVERY 1 HOUR 
DO
    UPDATE deal SET finish_time = CURRENT_TIMESTAMP where send_time = DATE_SUB(NOW(), INTERVAL 10 DAY)

CREATE EVENT auto_feedback
ON SCHEDULE EVERY 1 HOUR 
    BEGIN
    UPDATE rate SET buyer_rate = 5,buyer_rate_time=NOW() where (buyer_rate_time = NULL && deal_id in (select deal_id from deal where finish_time = DATE_SUB(NOW(), INTERVAL 14 DAY))
    UPDATE rate SET seller_rate = 5,seller_rate_time=NOW() where (seller_rate_time = NULL && deal_id in (select deal_id from deal where finish_time = DATE_SUB(NOW(), INTERVAL 14 DAY))
    END