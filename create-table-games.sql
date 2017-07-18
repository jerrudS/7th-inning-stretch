DROP TABLE IF EXISTS games;

CREATE TABLE games (
  id                    serial,
  matchup               text,
  time_of_first_pitch   text,
  experience_rating     text,
  lowest_ticket_price   text,
  average_ticket_price  text,
  link_to_buy_tickets   text
);
