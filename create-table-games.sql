DROP TABLE IF EXISTS games;

CREATE TABLE games (
  id                    serial,
  matchup               varchar,
  time_of_first_pitch   varchar,
  experience_rating     decimal,
  lowest_ticket_price   smallint,
  average_ticket_price  smallint,
  link_to_buy_tickets   varchar
);
