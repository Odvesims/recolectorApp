import {openDatabase} from 'react-native-sqlite-storage';
import nextFrame from 'next-frame';

let db = openDatabase({name: 'UserDatabase.db'});

export function tableDatabaseVersion(currentDbVersion) {
  return new Promise((resolve, reject) => {
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='database_props'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS database_props', []);
            txn.executeSql(
              `CREATE TABLE IF NOT EXISTS database_props(id INTEGER PRIMARY KEY AUTOINCREMENT, version integer, stored_version INTEGER)`,
              [],
            );
            txn.executeSql(
              `INSERT INTO database_props(version, stored_version) VALUES(1,0)`,
              [],
            );
          } else {
            txn.executeSql(`UPDATE database_props set version = ?`, [
              currentDbVersion,
            ]);
          }
        },
      );
      resolve(true);
    });
  });
}

export function getDatabaseVersion() {
  return new Promise((resolve, reject) => {
    let dbVersion = {};
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM database_props', [], (tx, results) => {
        let row = results.rows.item(0);
        dbVersion = {
          currentVersion: row.version,
          storedVersion: row.stored_version,
        };
        resolve(dbVersion);
      });
    });
  });
}

export function updateDatabaseVersion(dbVersion) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE database_props set version=?, stored_version=?',
        [dbVersion, dbVersion],
        (tx, results) => {},
      );
      resolve(true);
    });
  });
}

export function setUserTable() {
  return new Promise((resolve, reject) => {
    db.transaction(function(txn) {
      txn.executeSql('DROP TABLE IF EXISTS app_configurations');
      txn.executeSql('DROP TABLE IF EXISTS users_data');
      txn.executeSql('DROP TABLE IF EXISTS clients');
      txn.executeSql('DROP TABLE IF EXISTS employees');
      txn.executeSql('DROP TABLE IF EXISTS categories');
      txn.executeSql('DROP TABLE IF EXISTS subcategories');
      txn.executeSql('DROP TABLE IF EXISTS articles');
      txn.executeSql('DROP TABLE IF EXISTS orders');
      txn.executeSql('DROP TABLE IF EXISTS order_details');
      txn.executeSql('DROP TABLE IF EXISTS routes');
      txn.executeSql('DROP TABLE IF EXISTS route_details');
      txn.executeSql('DROP VIEW IF EXISTS view_orders');
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS app_configurations(id INTEGER PRIMARY KEY AUTOINCREMENT, host_name VARCHAR(100), port_number INT(10), uses_printer VARCHAR DEFAULT "no")',
      );
      txn.executeSql(
        'INSERT INTO app_configurations(host_name, port_number) VALUES(?, ?)',
        ['apimobile.sojaca.net', 444],
        (tx, results) => {},
      );
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS user_data(id INTEGER PRIMARY KEY AUTOINCREMENT, user VARCHAR(100), employee_code VARCHAR(10), employee_cat VARCHAR(2), employee_cat_label TEXT, clients_update INTEGER, employees_update INTEGER, categories_update INTEGER, subcategories_update INTEGER, articles_update INTEGER, orders_update INTEGER, routes_update INTEGER)',
      );
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS clients(id INTEGER PRIMARY KEY AUTOINCREMENT, client_code VARCHAR(10), name TEXT, address TEXT, city TEXT, state TEXT, country TEXT, phone_number TEXT, country_id integer)',
      );
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS employees(id INTEGER PRIMARY KEY AUTOINCREMENT, employee_code VARCHAR(10), name TEXT, category VARCHAR, phone_number VARCHAR, country_id INTEGER)',
      );
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS categories(id INTEGER PRIMARY KEY AUTOINCREMENT, category_code VARCHAR(10), description TEXT, price numeric)',
      );
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS subcategories(id INTEGER PRIMARY KEY AUTOINCREMENT, category_id INTEGER, subcategory_code VARCHAR(10), description TEXT, price numeric)',
      );
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS articles(id INTEGER PRIMARY KEY AUTOINCREMENT, category_id INTEGER, subcategory_id INTEGER, article_code VARCHAR(10), description TEXT, price numeric)',
      );
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS orders(id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER, address TEXT, order_document VARCHAR, client VARCHAR, date_register TEXT, order_total TEXT, assigned INTEGER DEFAULT 0)',
      );
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS order_details(id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER, orderdetail_id INTEGER, detail_type VARCHAR, detail_id INTEGER, detail_quantity NUMERIC, detail_price NUMERIC, detail_description TEXT, collected_quantity NUMERIC, collected_amount NUMERIC)',
      );
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS routes(id INTEGER PRIMARY KEY AUTOINCREMENT, route_id INTEGER, document_id INTEGER, document_acronym VARCHAR, document_number INTEGER, assigned_by  VARCHAR(10), assigned_to  VARCHAR(10), supervisor_name VARCHAR, employee_name VARCHAR, phone_number VARCHAR, date_from TEXT, date_to TEXT, status VARCHAR(1))',
      );
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS route_details(id INTEGER PRIMARY KEY AUTOINCREMENT, route_id INTEGER, order_id INTEGER, routedetail_id INTEGER)',
      );
    });
    resolve(true);
  });
}

export function getUserConfig() {
  return new Promise((resolve, reject) => {
    let userConfig = {};
    let i = 0;
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM app_configurations', [], (tx, results) => {
        for (i = 0; i < results.rows.length; ++i) {
          let row = results.rows.item(i);
          userConfig = {
            port_number: row.port_number.toString(),
            host: row.host_name,
            printer: row.uses_printer,
          };
        }
        resolve(userConfig);
      });
    });
  });
}

export function deleteUserConfig() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM app_configurations', [], (tx, results) => {});
    });
    resolve(true);
  });
}

export function saveUserConfig(count, host, port, printer) {
  return new Promise((resolve, reject) => {
    let updated;
    if (count == 0) {
      updated = false;
      db.transaction(function(tx) {
        tx.executeSql(
          'INSERT INTO app_configurations (host_name, port_number, uses_printer) VALUES (?,?,?)',
          [host, port, printer],
          (tx, results) => {},
        );
      });
    } else {
      updated = true;
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE app_configurations set host_name=?, port_number=? , uses_printer=?',
          [host, port, printer],
          (tx, results) => {},
        );
      });
    }
    resolve(updated);
  });
}

export function saveUserData(userData) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM user_data', [], (tx, results) => {});
    });
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO clients (user, employee_code, employee_cat, employee_cat_label, clients_update, employees_update, categories_update, subcategories_update, articles_update, orders_update, routes_update) VALUES (?, ?, ?, ?, ?, ?)',
        [
          userData.user,
          userData.employee_code,
          userData.employee_cat,
          userData.employee_cat_label,
          userData.clients_update,
          userData.employees_update,
          userData.categories_update,
          userData.subcategories_update,
          userData.articles_update,
          userData.orders_update,
          userData.routes_update,
        ],
        (tx, results) => {},
      );
    });
    resolve(true);
  });
}

export function saveClients(newRegisters, editRegisters) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM clients', [], (tx, results) => {});
    });
    for (let i = 0; i < newRegisters.length; i++) {
      let client = newRegisters[i];
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO clients (client_code, name, address, city, state, country, phone_number, country_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [
            client.client_code,
            client.name,
            client.address,
            client.city,
            client.state,
            client.country,
            client.phone_number,
            client.country_id,
          ],
          (tx, results) => {},
        );
      });
    }
    for (let i = 0; i < editRegisters.length; i++) {
      let client = editRegisters[i];
      db.transaction(tx => {
        tx.executeSql(
          `UPDATE clients set name=?, address=? , city=?, state=?, country=?, phone_number=? WHERE client_code = 
        ${client.client_code}`,
          [
            client.name,
            client.address,
            client.city,
            client.state,
            client.country,
            client.phone_number,
          ],
          (tx, results) => {},
        );
      });
    }
    resolve(true);
  });
}

export function updateClient(client) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      try {
        tx.executeSql(
          `UPDATE clients set name=?, address=? , city=?, state=?, country=?, phone_number=?, country_id = ? WHERE client_code = 
        ${client.client_code}`,
          [
            client.name,
            client.address,
            client.city,
            client.state,
            client.country,
            client.phone_number,
            client.country_id,
          ],
          (tx, results) => {},
        );
        resolve('ALERT_UPDATE_SUCCESFUL');
      } catch (err) {
        resolve('ALERT_UPDATE_FAILED');
      }
    });
  });
}

export function saveClient(client) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      try {
        tx.executeSql(
          'INSERT INTO clients(client_code, name, address, city, state, country, phone_number, country_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?) ',
          [
            client.code,
            client.name,
            client.address,
            client.city,
            client.state,
            client.country,
            client.phone_number,
            client.country_id,
          ],
          (tx, results) => {},
        );
        resolve('ALERT_REGISTER_SUCCESFUL');
      } catch (err) {
        resolve('ALERT_REGISTER_FAILED');
      }
    });
  });
}

export function getStoredClients() {
  let arrClients = [];
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM clients WHERE country_id = ${global.country_id}`,
        [],
        (tx, results) => {
          for (let i = 0; i < results.rows.length; ++i) {
            let row = results.rows.item(i);
            let clientObject = {
              client_code: row.client_code,
              name: row.name,
              address: row.address,
              city: row.city,
              state: row.state,
              country: row.country,
              phone_number: row.phone_number,
              country_id: row.country_id,
            };
            arrClients.push(clientObject);
          }
          resolve(arrClients);
        },
      );
    });
  });
}

export function saveEmployees(employees) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM employees', [], (tx, results) => {});
    });
    for (let i = 0; i < employees.length; i++) {
      let employee = employees[i];
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO employees(employee_code, name, category, phone_number, country_id) VALUES(?, ?, ?, ?, ?) ',
          [
            employee.code,
            employee.name,
            employee.category,
            employee.phone_number,
            employee.country_id,
          ],
          (tx, results) => {},
        );
      });
    }
    resolve(true);
  });
}

export function saveOrders(orders) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM orders', [], (tx, results) => {});
      tx.executeSql('DELETE FROM order_details', [], (tx, results) => {});
    });
    for (let i = 0; i < orders.length; i++) {
      let order = orders[i];
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO orders (order_id, order_document, client, date_register, order_total, address, assigned) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [
            order.order_id,
            order.order_document,
            order.client,
            order.date_register,
            order.order_total,
            order.address,
            order.assigned,
          ],
          (tx, results) => {
            for (let e = 0; e < order.order_details.length; e++) {
              let order_detail = order.order_details[e];
              tx.executeSql(
                'INSERT INTO order_details(order_id, orderdetail_id, detail_id, detail_type, detail_description, detail_quantity, detail_price, collected_quantity, collected_amount) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                  order_detail.order_id,
                  order_detail.orderdetail_id,
                  order_detail.detail_id,
                  order_detail.detail_type,
                  order_detail.detail_description,
                  order_detail.quantity,
                  order_detail.price,
                  order_detail.collected_quantity,
                  order_detail.collected_amount,
                ],
                (tx, results) => {},
              );
            }
          },
        );
      });
    }
    resolve(true);
  });
}

export function saveRoutes(routes) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM routes', [], (tx, results) => {});
      tx.executeSql('DELETE FROM routes_details', [], (tx, results) => {});
    });
    for (let i = 0; i < routes.length; i++) {
      let route = routes[i];
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO routes(route_id, document_id, document_acronym, document_number, assigned_by , assigned_to, supervisor_name, employee_name, phone_number, date_from, date_to, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            route.route_id,
            route.document_id,
            route.document_acronym,
            route.document_number,
            route.assigned_by,
            route.assigned_to,
            route.supervisor_name,
            route.employee_name,
            route.phone_number,
            route.date_from,
            route.date_to,
            route.status,
          ],
          (tx, results) => {},
        );
      });
      for (let e = 0; e < route.route_details.length; e++) {
        let route_detail = route.route_details[e];
        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO routes_details(route_id, order_id, routedetail_id) VALUES(?, ?, ?)',
            [
              route_detail.route_id,
              route_detail.order_id,
              route_detail.routedetail_id,
            ],
            (tx, results) => {},
          );
        });
      }
    }
    resolve(true);
  });
}

export function saveCategories(categories) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM categories', [], (tx, results) => {});
    });
    for (let i = 0; i < categories.length; i++) {
      let category = categories[i];
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO categories(category_code, description, price) VALUES(?, ?, ?) ',
          [category.code, category.name, category.price],
          (tx, results) => {},
        );
      });
    }
    resolve(true);
  });
}

export function saveSubcategories(subcategories) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM subcategories', [], (tx, results) => {});
    });
    for (let i = 0; i < subcategories.length; i++) {
      let subcategory = subcategories[i];
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO subcategories(category_id, subcategory_code, description, price) VALUES(?, ?, ?, ?) ',
          [
            subcategory.category_id,
            subcategory.code,
            subcategory.name,
            subcategory.price,
          ],
          (tx, results) => {},
        );
      });
    }
    resolve(true);
  });
}

export function saveArticles(articles) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM articles', [], (tx, results) => {});
    });
    for (let i = 0; i < articles.length; i++) {
      let article = articles[i];
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO articles(category_id, subcategory_id, article_code, description, price) VALUES(?, ?, ?, ?, ?) ',
          [
            article.category_id,
            article.subcategory_id,
            article.code,
            article.name,
            article.price,
          ],
          (tx, results) => {},
        );
      });
    }
    resolve(true);
  });
}

export function getStoredRoutes(routes_status) {
  let arrClients = [];
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM routes WHERE status = '${routes_status}'`,
        [],
        (tx, results) => {
          for (let i = 0; i < results.rows.length; ++i) {
            let row = results.rows.item(i);
            let clientObject = {
              client_code: row.route_cod,
              name: row.name,
              address: row.address,
              city: row.city,
              state: row.province,
              country: row.country,
              phone: row.phone,
            };
            arrClients.push(clientObject);
          }
          resolve(arrClients);
        },
      );
    });
  });
}

export function getOrders() {
  let arrOrders = [];
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM orders`, [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          let row = results.rows.item(i);
          let orderObject = {
            document: row.order_document,
            client: row.client,
            address: row.address,
            order_total: row.order_total,
            assigned: row.assigned,
          };
          arrOrders.push(orderObject);
        }
      });
      resolve(arrOrders);
    });
  });
}

export function getAssignedOrders() {
  let arrOrders = [];
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT o.order_document, o.client, o.address, o.order_total, o.assigned, c.name FROM orders o, clients c WHERE assigned = 1 AND c.client_code = o.client`,
        [],
        (tx, results) => {
          for (let i = 0; i < results.rows.length; ++i) {
            let row = results.rows.item(i);
            let orderObject = {
              document: row.order_document,
              client: row.client,
              address: row.address,
              name: row.name,
              order_total: row.order_total,
            };
            arrOrders.push(orderObject);
          }
          resolve(arrOrders);
        },
      );
    });
  });
}

export function getNotAssignedOrders() {
  return new Promise((resolve, reject) => {
    let arrOrders = [];
    db.transaction(tx => {
      tx.executeSql(
        'SELECT o.order_document, o.client, o.address, o.order_total, o.assigned, c.name FROM orders o, clients c WHERE assigned != 1 AND c.client_code = o.client',
        [],
        (tx, results) => {
          for (let i = 0; i < results.rows.length; ++i) {
            let row = results.rows.item(i);
            let orderObject = {
              document: row.order_document,
              client: row.client,
              name: row.name,
              address: row.address,
              order_total: row.order_total,
            };
            arrOrders.push(orderObject);
          }
          resolve(arrOrders);
        },
      );
    });
  });
}

export function getStoredCategories() {
  return new Promise((resolve, reject) => {
    let arrCategories = [];
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM categories', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          let row = results.rows.item(i);
          let categoryObject = {
            category_code: row.category_code,
            description: row.description,
            price: row.price,
          };
          arrCategories.push(categoryObject);
        }
        resolve(arrCategories);
      });
    });
  });
}

export function getStoredSubcategories() {
  let arrSubcategories = [];
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM subcategories', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          let row = results.rows.item(i);
          let subcategoryObject = {
            category_id: row.category_id,
            subcategory_code: row.subcategory_code,
            description: row.description,
            price: row.price,
          };
          arrSubcategories.push(subcategoryObject);
        }
        resolve(arrSubcategories);
      });
    });
  });
}

export function getStoredArticles() {
  let arrArticles = [];
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM articles', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          let row = results.rows.item(i);
          let articleObject = {
            category_id: row.category_id,
            subcategory_id: row.subcategory_id,
            article_code: row.article_code,
            description: row.description,
            price: row.price,
          };
          arrArticles.push(articleObject);
        }
        resolve(arrArticles);
      });
    });
  });
}
