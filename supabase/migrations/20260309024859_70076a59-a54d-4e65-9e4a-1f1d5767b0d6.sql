-- Clear old story events
DELETE FROM story_events;

-- Insert corrected timeline
INSERT INTO story_events (sort_order, icon, title, title_fr, title_es, date_label, date_label_fr, date_label_es, description, description_fr, description_es) VALUES
(1, '💫', 'The First Meeting', 'La Première Rencontre', 'El Primer Encuentro', '2013', '2013', '2013',
 'In 2013, Ruben was coming home from school in Iruban when someone called out "Maloba" on the street. Corine, walking nearby, turned around at the same time — because she carries the same name. Their eyes met, and curiosity drew them together. Sharing that unique name, they started talking and getting to know each other. A coincidence that became the beginning of everything.',
 'En 2013, Ruben rentrait de l''école à Iruban quand quelqu''un a crié "Maloba" dans la rue. Corine, qui marchait tout près, s''est retournée en même temps — car elle porte le même nom. Leurs regards se sont croisés, et la curiosité les a rapprochés. Une coïncidence devenue le début de tout.',
 'En 2013, Ruben regresaba de la escuela en Iruban cuando alguien gritó "Maloba" en la calle. Corine, que caminaba cerca, se dio vuelta al mismo tiempo — porque lleva el mismo nombre. Sus miradas se cruzaron y la curiosidad los unió.'),

(2, '✈️', 'Separate Paths', 'Des Chemins Séparés', 'Caminos Separados', '2014 — 2015', '2014 — 2015', '2014 — 2015',
 'In 2014, life took them in different directions. Corine left to study in Nairobi, Kenya, while Ruben traveled to Zimbabwe for his studies. Then in 2015, Corine crossed the ocean to settle in America. Despite the distance and continents between them, the bond forged in Iruban never faded.',
 'En 2014, la vie les a menés dans des directions différentes. Corine est partie étudier à Nairobi, au Kenya, tandis que Ruben s''est envolé pour le Zimbabwe. Puis en 2015, Corine a traversé l''océan pour s''installer aux États-Unis. Malgré la distance, le lien forgé à Iruban n''a jamais disparu.',
 'En 2014, la vida los llevó en direcciones diferentes. Corine se fue a estudiar a Nairobi, Kenia, mientras Ruben viajó a Zimbabue. Luego en 2015, Corine cruzó el océano para establecerse en América. A pesar de la distancia, el vínculo nunca se desvaneció.'),

(3, '🔥', 'The Trip That Changed Everything', 'Le Voyage Qui a Tout Changé', 'El Viaje Que Lo Cambió Todo', '2019', '2019', '2019',
 'In 2019, after years apart, they reunited in Nairobi, Kenya. This trip changed everything. Together they talked for hours, shared their dreams, planned their future, and aligned their ambitions. Nairobi became the place where their shared vision took shape and their love was confirmed.',
 'En 2019, après des années de séparation, ils se sont retrouvés à Nairobi, au Kenya. Ce voyage a tout changé. Ensemble, ils ont parlé pendant des heures, partagé leurs rêves et planifié leur avenir. Nairobi est devenu l''endroit où leur vision commune a pris forme.',
 'En 2019, después de años separados, se reunieron en Nairobi, Kenia. Este viaje lo cambió todo. Juntos hablaron durante horas, compartieron sus sueños y planificaron su futuro.'),

(4, '🤝', 'The Bride Price', 'Le Prix de la Mariée', 'El Precio de la Novia', '2022', '2022', '2022',
 'In 2022, Ruben fulfilled the sacred tradition of the bride price — a deeply rooted African custom that honors the bride''s family and seals the commitment between both families. A moment of respect, sacrifice, and faith, marking the seriousness of their union.',
 'En 2022, Ruben a accompli la tradition sacrée du prix de la mariée — une coutume africaine profondément ancrée qui honore la famille de la mariée et scelle l''engagement entre les deux familles. Un moment de respect, de sacrifice et de foi.',
 'En 2022, Ruben cumplió la sagrada tradición del precio de la novia — una costumbre africana que honra a la familia de la novia y sella el compromiso entre ambas familias.'),

(5, '💍', 'The Proposal', 'La Demande en Mariage', 'La Propuesta', 'September 2022', 'Septembre 2022', 'Septiembre 2022',
 'In September 2022, Ruben got down on one knee and proposed to Corine. After all the trials, the distance, and the sacrifices, this moment sealed the promise of a future together. She said yes, and a new chapter began.',
 'En septembre 2022, Ruben a posé le genou à terre et a demandé Corine en mariage. Après toutes les épreuves, la distance et les sacrifices, ce moment a scellé la promesse d''un avenir ensemble. Elle a dit oui.',
 'En septiembre de 2022, Ruben se arrodilló y le propuso matrimonio a Corine. Después de todas las pruebas, la distancia y los sacrificios, este momento selló la promesa de un futuro juntos. Ella dijo que sí.'),

(6, '🏡', 'Toward Our Big Day', 'Vers Notre Grand Jour', 'Hacia Nuestro Gran Día', '2022 — 2026', '2022 — 2026', '2022 — 2026',
 'Since then, they have been building their life together, overcoming the challenges of settling abroad with strength and faith. Every obstacle made them stronger, every sacrifice deepened their love. And here they are, ready to celebrate the most beautiful day of their lives in 2026.',
 'Depuis, ils construisent leur vie ensemble, surmontant les défis de s''installer à l''étranger avec force et foi. Chaque obstacle les a rendus plus forts, chaque sacrifice a approfondi leur amour. Et les voici, prêts à célébrer le plus beau jour de leur vie en 2026.',
 'Desde entonces, han construido su vida juntos, superando los desafíos de establecerse en el extranjero con fuerza y fe. Cada obstáculo los hizo más fuertes. Y aquí están, listos para celebrar el día más hermoso de sus vidas en 2026.');