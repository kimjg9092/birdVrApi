const db = require('../db');


const createlocation = async (req, res) => {
  const { uuid, positionX, positionY, positionZ, rotationX, rotationY ,rotationZ ,typeId } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO tb_location (uuid, positionx, positiony, positionz, rotationx, rotationy ,rotationz ,typeid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [uuid, positionX, positionY, positionZ, rotationX, rotationY ,rotationZ ,typeId]
    );
    // res.status(201).json(result.rows[0]);
    // 성공 응답
    res.status(200).json({ status: '200 OK' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createlocationData = async (req, res) => {
  const { uuid, positionX, positionY, positionZ, rotationX, rotationY, rotationZ, typeId } = req.body;
  try {
    // 1. uuid가 이미 존재하는지 확인
    const findResult = await db.query(
      'SELECT * FROM tb_location WHERE uuid = $1',
      [uuid]
    );

    if (findResult.rows.length > 0) {
      // uuid가 존재할 경우 UPDATE 쿼리 실행
      await db.query(
        'UPDATE tb_location SET positionx = $1, positiony = $2, positionz = $3, rotationx = $4, rotationy = $5, rotationz = $6, typeid = $7 WHERE uuid = $8',
        [positionX, positionY, positionZ, rotationX, rotationY, rotationZ, typeId, uuid]
      );
      // 성공적으로 업데이트된 경우 응답
      res.status(200).json({ status: '200 OK' });
    } else {
      // uuid가 존재하지 않을 경우 INSERT 쿼리 실행
      await db.query(
        'INSERT INTO tb_location (uuid, positionx, positiony, positionz, rotationx, rotationy, rotationz, typeid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [uuid, positionX, positionY, positionZ, rotationX, rotationY, rotationZ, typeId]
      );
      // 성공적으로 삽입된 경우 응답
      res.status(200).json({ status: '200 OK' });
    }
  } catch (error) {
    // 에러 발생 시 응답
    res.status(500).json({ error: error.message });
  }
};



const getlocation = async (req, res) => {
  const { uuid } = req.params;
  try {    
    const result = await db.query(
      `SELECT 
        positionX AS "positionX",
        positionY AS "positionY", 
        positionZ AS "positionZ",
        rotationX AS "rotationX",
        rotationY AS "rotationY",
        rotationZ AS "rotationZ",
        typeId AS "typeId"
      FROM tb_location 
      WHERE uuid = $1`,
      [uuid]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletelocation = async (req, res) => {
  const { uuid } = req.params;
  try {
    const result = await db.query('DELETE FROM tb_location WHERE uuid = $1 RETURNING *', [uuid]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Data not found' });
    }    
    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const createDevices= async (req, res) => {
  const { deviceId, status, lastActiveAt, batteryHMD, batteryControllerR, batteryControllerL, positionX, positionY, positionZ, rotationX, rotationY ,rotationZ } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO tb_devices (deviceid, status, lastactiveat, batteryhmd, batterycontrollerr, batterycontrollerl, positionx, positiony, positionz, rotationx, rotationy ,rotationz) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [deviceId, status, lastActiveAt, batteryHMD, batteryControllerR, batteryControllerL ,positionX, positionY, positionZ, rotationX, rotationY ,rotationZ]
    );
    //res.status(201).json(result.rows[0]);
    res.status(200).json({ status: '200 OK' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createDevicesData = async (req, res) => {
  const { deviceId, status, lastActiveAt, batteryHMD, batteryControllerR, batteryControllerL, positionX, positionY, positionZ, rotationX, rotationY, rotationZ } = req.body;
  try {
    // 1. deviceId가 이미 존재하는지 확인
    const findResult = await db.query(
      'SELECT * FROM tb_devices WHERE deviceid = $1',
      [deviceId]
    );

    if (findResult.rows.length > 0) {
      // deviceId가 존재할 경우 UPDATE 쿼리 실행
      await db.query(
        'UPDATE tb_devices SET status = $1, lastactiveat = $2, batteryhmd = $3, batterycontrollerr = $4, batterycontrollerl = $5, positionx = $6, positiony = $7, positionz = $8, rotationx = $9, rotationy = $10, rotationz = $11 WHERE deviceid = $12',
        [status, lastActiveAt, batteryHMD, batteryControllerR, batteryControllerL, positionX, positionY, positionZ, rotationX, rotationY, rotationZ, deviceId]
      );
      // 업데이트 성공 응답
      res.status(200).json({ status: '200 OK' });
    } else {
      // deviceId가 없을 경우 INSERT 쿼리 실행
      await db.query(
        'INSERT INTO tb_devices (deviceid, status, lastactiveat, batteryhmd, batterycontrollerr, batterycontrollerl, positionx, positiony, positionz, rotationx, rotationy, rotationz) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
        [deviceId, status, lastActiveAt, batteryHMD, batteryControllerR, batteryControllerL, positionX, positionY, positionZ, rotationX, rotationY, rotationZ]
      );
      // 삽입 성공 응답
      res.status(200).json({ status: '200 OK'});
    }
  } catch (error) {
    // 에러 발생 시 응답
    res.status(500).json({ error: error.message });
  }
};


const getDevices = async (req, res) => {
  const { deviceId } = req.params;
  try {    
    const result = await db.query(
      `SELECT 
        deviceid AS "deviceId",
        status AS "status", 
        lastactiveat AS "lastActiveAt",
        batteryhmd AS "batteryHMD",
        batterycontrollerr AS "batteryControllerR",
        batterycontrollerl AS "batteryControllerL",
        positionx AS "positionX", 
        positiony AS "positionY", 
        positionz AS "positionZ", 
        rotationx AS "rotationX", 
        rotationy AS "rotationY",        
        rotationz AS "rotationZ"                        
      FROM tb_devices 
      WHERE deviceid = $1`,
      [deviceId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDevicesList = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT 
        deviceid AS "deviceId",
        status AS "status", 
        lastactiveat AS "lastActiveAt",
        batteryhmd AS "batteryHMD",
        batterycontrollerr AS "batteryControllerR",
        batterycontrollerl AS "batteryControllerL",
        positionx AS "positionX", 
        positiony AS "positionY", 
        positionz AS "positionZ", 
        rotationx AS "rotationX", 
        rotationy AS "rotationY",        
        rotationz AS "rotationZ"    
      FROM tb_devices ORDER BY deviceid`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteDevices = async (req, res) => {
  const { deviceId } = req.params;
  try {
    const result = await db.query('DELETE FROM tb_devices WHERE deviceid = $1 RETURNING *', [deviceId]);
    if (result.rows.length === 0) {
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
    const result = await db.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result.rows[0]);
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