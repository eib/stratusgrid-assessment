CREATE TABLE shows (
    show_id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    num_seasons INTEGER NOT NULL,
    start_year INTEGER NOT NULL
);
