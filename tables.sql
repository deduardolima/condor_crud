-- Active: 1657114730639@@35.226.146.116@3306@silveira-21814583-diego-lima
CREATE TABLE IF NOT EXISTS Customer_Condor(
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(25) NOT NULL,
        password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Banner_Condor(
        banner_id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        customer_id VARCHAR(255) NOT NULL,
        endAt VARCHAR(255) NOT NULL,
        startAt VARCHAR(15) NOT NULL,
        status boolean NOT NULL,
        FOREIGN KEY(customer_id) REFERENCES Customer_Condor(id)
);         