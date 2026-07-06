-- =============================================================================
-- 03_seed.sql
-- Dades inicials: els 6 professors i les 9 franges horàries del prototip.
--
-- Executar connectat a la BD del projecte:
--   psql -U postgres -d workshop_reservas -f bd/03_seed.sql
--
-- Idempotència: aquest script assumeix taules buides. Per re-sembrar des de
-- zero, buida abans les taules (p. ex. TRUNCATE reservations, professors,
-- time_slots RESTART IDENTITY CASCADE;).
-- =============================================================================

-- Professors (l'ordre d'inserció dóna ids 1..6; els primers 5 mapegen
-- prof-1..prof-5 del prototip original).
INSERT INTO professors (name, subject, initials, bio) VALUES
  ('Ana Martín',    'Frontend & React', 'AM', 'Especialista en interfaces accesibles y design systems.'),
  ('Bruno Sáez',    'Backend & APIs',   'BS', 'Arquitectura de servicios, Node.js y bases de datos.'),
  ('Carla Ferrer',  'Producto & UX',    'CF', 'Investigación de usuario y diseño de producto.'),
  ('David Ortega',  'DevOps & Cloud',   'DO', 'CI/CD, contenedores e infraestructura como código.'),
  ('Elena Ruiz',    'Data & IA',        'ER', 'Modelos de datos, analítica y machine learning aplicado.'),
  ('Pedro Bonilla', 'Testing & QA',     'PB', 'Automatización de tests, integración continua y calidad de código.');

-- Franges horàries (app/src/lib/data/slots.ts).
INSERT INTO time_slots (slot_time) VALUES
  ('09:00'), ('10:00'), ('11:00'), ('12:00'), ('13:00'),
  ('16:00'), ('17:00'), ('18:00'), ('19:00');
