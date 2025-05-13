-- Create database
CREATE DATABASE IF NOT EXISTS travel_agency;
USE travel_agency;

-- Destinations table
CREATE TABLE destinations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    subtitle VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    is_popular BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quick search options table
CREATE TABLE quick_search_options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User stats table
CREATE TABLE user_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    month VARCHAR(20) NOT NULL,
    stats_data JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO destinations (name, location, subtitle, price, is_popular) VALUES
('Lejátszám', 'India', 'Kerala', 17000.00, TRUE),
('Elfiel Tower Tour', NULL, NULL, 20000.00, TRUE),
('Szikholnai Old City', NULL, NULL, 10000.00, TRUE),
('Kashmir', NULL, NULL, 5000.00, TRUE);

INSERT INTO quick_search_options (title, description) VALUES
('FIZETÉSI BEÁLÍTÁSOK', 'BEÁLÍTÁSOK'),
('BALATON', 'NEZIÓ ÁR'),
('DUBAI', 'SZ300HUF'),
('MALDÍV-SZIGETEK', 'NEZIÓ ÁR'),
('120.000HUF', 'NEZIÓ ÁR'),
('110.000HUF', 'NEZIÓ ÁR');

INSERT INTO user_stats (user_id, month, stats_data) VALUES
(1, '2023 MÁRS', '{"percentages": [9, 80, 11, 18, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]}');