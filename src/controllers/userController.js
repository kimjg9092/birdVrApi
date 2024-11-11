const db = require('../db');

const createlocation = async (req, res) => {
  const { uuid, positionX, positionY, positionZ, rotationX, rotationY, rotationZ, typeId } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO tb_location (uuid, positionx, positiony, positionz, rotationx, rotationy, rotationz, typeid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [uuid, positionX, positionY, positionZ, rotationX, rotationY, rotationZ, typeId]
    );
    res.status(200).json({ status: '200 OK' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createlocationData = async (req, res) => {
  const { uuid, positionX, positionY, positionZ, rotationX, rotationY, rotationZ, typeId } = req.body;
  try {
    const [rows] = await db.query(
      'SELECT * FROM tb_location WHERE uuid = ?',
      [uuid]
    );

    if (rows && rows.length > 0) {
      await db.query(
        'UPDATE tb_location SET positionx = ?, positiony = ?, positionz = ?, rotationx = ?, rotationy = ?, rotationz = ?, typeid = ? WHERE uuid = ?',
        [positionX, positionY, positionZ, rotationX, rotationY, rotationZ, typeId, uuid]
      );
    } else {
      await db.query(
        'INSERT INTO tb_location (uuid, positionx, positiony, positionz, rotationx, rotationy, rotationz, typeid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [uuid, positionX, positionY, positionZ, rotationX, rotationY, rotationZ, typeId]
      );
    }
    res.status(200).json({ status: '200 OK' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getlocation = async (req, res) => {
  const { uuid } = req.params;
  try {    
    const [rows] = await db.query(
      `SELECT 
        positionx AS positionX,
        positiony AS positionY, 
        positionz AS positionZ,
        rotationx AS rotationX,
        rotationy AS rotationY,
        rotationz AS rotationZ,
        typeid AS typeId
      FROM tb_location 
      WHERE uuid = ?`,
      [uuid]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletelocation = async (req, res) => {
  const { uuid } = req.params;
  try {
    const [result] = await db.query('DELETE FROM tb_location WHERE uuid = ?', [uuid]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Data not found' });
    }    
    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDevices = async (req, res) => {
  const { deviceId, status, lastActiveAt, batteryHMD, batteryControllerR, batteryControllerL, positionX, positionY, positionZ, rotationX, rotationY, rotationZ } = req.body;
  try {
    await db.query(
      'INSERT INTO tb_devices (deviceid, status, lastactiveat, batteryhmd, batterycontrollerr, batterycontrollerl, positionx, positiony, positionz, rotationx, rotationy, rotationz) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [deviceId, status, lastActiveAt, batteryHMD, batteryControllerR, batteryControllerL, positionX, positionY, positionZ, rotationX, rotationY, rotationZ]
    );
    res.status(200).json({ status: '200 OK' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDevicesData = async (req, res) => {
  const { deviceId, status, lastActiveAt, batteryHMD, batteryControllerR, batteryControllerL, positionX, positionY, positionZ, rotationX, rotationY, rotationZ } = req.body;
  try {
    // 1. deviceId가 이미 존재하는지 확인
    const [rows] = await db.query(
      'SELECT * FROM tb_devices WHERE deviceid = ?',
      [deviceId]
    );

    if (rows.length > 0) {
      // deviceId가 존재할 경우 UPDATE 쿼리 실행
      await db.query(
        'UPDATE tb_devices SET status = ?, lastactiveat = ?, batteryhmd = ?, batterycontrollerr = ?, batterycontrollerl = ?, positionx = ?, positiony = ?, positionz = ?, rotationx = ?, rotationy = ?, rotationz = ? WHERE deviceid = ?',
        [status, lastActiveAt, batteryHMD, batteryControllerR, batteryControllerL, positionX, positionY, positionZ, rotationX, rotationY, rotationZ, deviceId]
      );
      res.status(200).json({ status: '200 OK' });
    } else {
      // deviceId가 없을 경우 INSERT 쿼리 실행
      await db.query(
        'INSERT INTO tb_devices (deviceid, status, lastactiveat, batteryhmd, batterycontrollerr, batterycontrollerl, positionx, positiony, positionz, rotationx, rotationy, rotationz) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [deviceId, status, lastActiveAt, batteryHMD, batteryControllerR, batteryControllerL, positionX, positionY, positionZ, rotationX, rotationY, rotationZ]
      );
      res.status(200).json({ status: '200 OK' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDevices = async (req, res) => {
  const { deviceId } = req.params;
  try {    
    const [rows] = await db.query(
      `SELECT 
        deviceid AS deviceId,
        status,
        lastactiveat AS lastActiveAt,
        batteryhmd AS batteryHMD,
        batterycontrollerr AS batteryControllerR,
        batterycontrollerl AS batteryControllerL,
        positionx AS positionX,
        positiony AS positionY,
        positionz AS positionZ,
        rotationx AS rotationX,
        rotationy AS rotationY,
        rotationz AS rotationZ
      FROM tb_devices 
      WHERE deviceid = ?`,
      [deviceId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDevicesList = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 
        deviceid AS deviceId,
        status,
        lastactiveat AS lastActiveAt,
        batteryhmd AS batteryHMD,
        batterycontrollerr AS batteryControllerR,
        batterycontrollerl AS batteryControllerL,
        positionx AS positionX,
        positiony AS positionY,
        positionz AS positionZ,
        rotationx AS rotationX,
        rotationy AS rotationY,
        rotationz AS rotationZ
      FROM tb_devices 
      ORDER BY deviceid`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDevices = async (req, res) => {
  const { deviceId } = req.params;
  try {
    const [result] = await db.query('DELETE FROM tb_devices WHERE deviceid = ?', [deviceId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Data not found' });
    }    
    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createlocation,
  createlocationData,
  getlocation,
  deletelocation,
  createDevices,
  createDevicesData,
  getDevices,
  getDevicesList,
  deleteDevices,
  updateUser
};