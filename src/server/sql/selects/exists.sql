SELECT
  {{ column }}
FROM
  {{ table }}
WHERE
  {{ column }} = {{ value }}
LIMIT
  1;
