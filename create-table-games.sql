DROP TABLE IF EXISTS games;

CREATE TABLE games (
  id                    serial,
  matchup               varchar,
  time_of_first_pitch   varchar,
  experience_rating     decimal,
  lowest_ticket_price   decimal,
  average_ticket_price  decimal,
  link_to_buy_tickets   varchar
);
