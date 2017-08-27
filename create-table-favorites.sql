DROP TABLE IF EXISTS favorites;

CREATE TABLE favorites (
  id                  serial,
  matchup             varchar,
  timeOfFirstPitch    varchar,
  experienceRating    decimal,
  lowestTicketPrice   decimal,
  averageTicketPrice  decimal,
  url                 varchar
);
