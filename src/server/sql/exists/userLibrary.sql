SELECT EXISTS
  (
    SELECT
      *
    FROM
      {{ table }}
    WHERE
      user_id = {{ userId }} &&
      {{ column }} = {{ id }}
  );
