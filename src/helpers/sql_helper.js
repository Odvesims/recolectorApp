import {openDatabase} from 'react-native-sqlite-storage';
import nextFrame from 'next-frame';

let db = openDatabase({name: 'UserDatabase.db'});

export async function tableDatabaseVersion() {
  db.transaction(function(txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='database_props'",
      [],
      function(tx, res) {
        console.log('item:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS database_props', []);
          txn.executeSql(
            `CREATE TABLE IF NOT EXISTS database_props(id INTEGER PRIMARY KEY AUTOINCREMENT, version integer DEFAULT ${global.database_version}, stored_version INTEGER DEFAULT 1)`,
            [],
          );
        } else {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM database_props', [], (tx, results) => {
              var temp = [];
              if (results.rows.length == 0) {
                tx.executeSql(
                  'INSERT INTO database_props (version, stored_version) VALUES (?,?)',
                  [global.database_version, global.stored_database_version],
                  (tx, results) => {},
                );
              }
            });
          });
        }
      },
    );
  });
}

export async function getUserConfig() {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM app_configurations', [], (tx, results) => {
      for (let i = 0; i < results.rows.length; ++i) {
        let row = results.rows.item(i);
        global.hostName = row.host_name;
        global.portNumber = row.port_number;
      }
    });
  });
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM users_data', [], (tx, results) => {
      for (let i = 0; i < results.rows.length; ++i) {
        let row = results.rows.item(i);
        this.firstLogin = row.first_login;
      }
    });
  });
}

export function checkDatabase(databaseVersion) {
  if (databaseVersion < global.database_version) {
    updateDatabaseVersion(global.database_version);
    databaseVersion = global.database_version;
  }
  let userdbVersion = getUserDatabaseVersion();
  if (databaseVersion > userdbVersion) {
    this.setUserTable().then(result => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE database_props set stored_version = ?',
          [databaseVersion],
          (tx, results) => {},
        );
      });
    });
  }
}

export async function getDatabaseVersion() {
  let currentVersion = 0;
  let storedVersion = 0;
  await db.transaction(tx => {
    tx.executeSql('SELECT * FROM database_props', [], (tx, results) => {
      let row = results.rows.item(0);
      currentVersion = row.version;
      storedVersion = row.stored_version;
      if (
        currentVersion < global.database_version ||
        storedVersion < currentVersion
      ) {
        updateDatabaseVersion(global.database_version);
        setUserTable();
        updateStoredDbVersion(global.database_version);
      }
    });
  });
  return currentVersion;
}

export function getUserDatabaseVersion() {
  let currentVersion = 0;
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM database_props', [], (tx, results) => {
      for (let i = 0; i < results.rows.length; ++i) {
        let row = results.rows.item(i);
        currentVersion = row.stored_version;
      }
    });
  });
  return currentVersion;
}

async function updateDatabaseVersion(dbVersion) {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE database_props set version=?',
      [dbVersion],
      (tx, results) => {},
    );
  });
}

async function updateStoredDbVersion(dbVersion) {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE database_props set stored_version=?',
      [dbVersion],
      (tx, results) => {},
    );
  });
}

export async function setUserTable() {
  let array_tables_names = [
    'users_data',
    'clients',
    'employees',
    'categories',
    'subcategories',
    'articles',
    'orders',
    'order_details',
    'routes',
    'routes_details',
  ];
  let array_create = [
    `CREATE TABLE IF NOT EXISTS ${
      array_tables_names[0]
    }(id INTEGER PRIMARY KEY AUTOINCREMENT, user VARCHAR(100), employee_id INTEGER, employee_cat VARCHAR, first_login INTEGER, clients_update INTEGER, employees_update INTEGER, categories_update INTEGER, subcategories_update INTEGER, articles_update INTEGER, orders_update INTEGER, routes_update INTEGER)`,
    `CREATE TABLE IF NOT EXISTS ${
      array_tables_names[1]
    }(id INTEGER PRIMARY KEY AUTOINCREMENT, client_code VARCHAR(10), name TEXT, address, city, province, country)`,
    `CREATE TABLE IF NOT EXISTS ${
      array_tables_names[2]
    }(id INTEGER PRIMARY KEY AUTOINCREMENT, employee_code VARCHAR(10), name TEXT, category VARCHAR)`,
    `CREATE TABLE IF NOT EXISTS ${
      array_tables_names[3]
    }(id INTEGER PRIMARY KEY AUTOINCREMENT, category_code VARCHAR(10), description TEXT, price numeric)`,
    `CREATE TABLE IF NOT EXISTS ${
      array_tables_names[4]
    }(id INTEGER PRIMARY KEY AUTOINCREMENT, subcategory_code VARCHAR(10), description TEXT, price numeric)`,
    `CREATE TABLE IF NOT EXISTS ${
      array_tables_names[5]
    }(id INTEGER PRIMARY KEY AUTOINCREMENT, article_code VARCHAR(10), category_id INTEGER, subcategory_id INTEGER, description TEXT, price numeric)`,
    `CREATE TABLE IF NOT EXISTS ${
      array_tables_names[6]
    }(id INTEGER PRIMARY KEY AUTOINCREMENT, client_id INTEGER, client_code VARCHAR(10), client_name VARCHAR, date_register TEXT, order_total NUMERIC, registered by INTEGER, registered_at TEXT)`,
    `CREATE TABLE IF NOT EXISTS ${
      array_tables_names[7]
    }(id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER, detail_type VARCHAR, detail_id INTEGER, detail_price NUMERIC)`,
    `CREATE TABLE IF NOT EXISTS ${
      array_tables_names[8]
    }(id INTEGER PRIMARY KEY AUTOINCREMENT, assigned_by INTEGER, assigned_to INTEGER, client_id INTEGER, client_code VARCHAR(10), client_name VARCHAR, client_address VARCHAR, date_from TEXT, date_to TEXT)`,
    `CREATE TABLE IF NOT EXISTS ${
      array_tables_names[9]
    }(id INTEGER PRIMARY KEY AUTOINCREMENT, route_id INTEGER, order_id INTEGER)`,
  ];

  for (let i = 0; i < array_tables_names.length; i++) {
    db.transaction(function(txn) {
      txn.executeSql(
        txn.executeSql(`DROP TABLE IF EXISTS ${array_tables_names[i]}`, []),
        function(tx, res) {},
      );
      txn.executeSql(txn.executeSql(`${array_create[i]}`, []), function(
        tx,
        res,
      ) {});
    });
  }
}

export async function saveClients(newRegisters, editRegisters) {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM clients', [], (tx, results) => {});
  });
  for (let i = 0; i < newRegisters.length; i++) {
    let client = newRegisters[i];
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO clients (client_code, name, address, city, province, country) VALUES (?, ?, ?, ?, ?, ?)',
        [
          client.client_code,
          client.name,
          client.address,
          client.city,
          client.province,
          client.country,
        ],
        (tx, results) => {},
      );
    });
  }
  for (let i = 0; i < editRegisters.length; i++) {
    let client = editRegisters[i];
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE clients set name=?, address=? , city=?, province=, country=? WHERE client_code = 
        ${client.client_code}`,
        [
          client.name,
          client.address,
          client.city,
          client.province,
          client.country,
        ],
        (tx, results) => {},
      );
    });
  }
}

export async function getStoredClients() {
  let arrClients = [];
  return db.transaction(tx => {
    tx.executeSql('SELECT * FROM clients', [], (tx, results) => {
      for (let i = 0; i < results.rows.length; ++i) {
        let row = results.rows.item(i);
        let client = {};
        client.client_code = row.client_code;
        client.name = row.name;
        client.address = row.address;
        client.city = row.city;
        client.province = row.province;
        client.country = row.country;
        arrClients.push(results.rows);
      }
      return arrClients;
    });
  });
}
