
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
ALTER TABLE results ADD COLUMN department VARCHAR(255);
ALTER TABLE results ADD COLUMN matric_no VARCHAR(255);
-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

