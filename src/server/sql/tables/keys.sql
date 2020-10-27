CREATE TABLE IF NOT EXISTS keys (
	key_id uuid,
	flat_name text NOT NULL,
	sharp_name text NOT NULL,
	camelot_name text NOT NULL,
	CONSTRAINT keys_pk
		PRIMARY KEY (key_id)
);