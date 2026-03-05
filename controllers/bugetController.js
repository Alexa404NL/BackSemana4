const pool = require("../db");
exports.getAll = async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM budget ORDER BY date DESC");
		res.json(result.rows);
	} catch (error) {
		console.error("Error al obtener presupuestos:", error);
		res.status(500).json({ error: "Error al obtener presupuestos" });
	}
};

exports.getById = async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM budget WHERE id = $1", [
			req.params.id,
		]);
		if (result.rows.length === 0) {
			return res.status(404).json({ error: "no encontrado" });
		}
		res.json(result.rows[0]);
	} catch (error) {
		console.error("Error al obtener presupuestos:", error);
		res.status(500).json({ error: "Error al obtener presupuestos" });
	}
};
// Crear un nuevo país
exports.createBudget = async (req, res) => {
	const { name } = req.body;
	// Validación básica
	if (!name) {
		return res.status(400).json({ error: "El nombre del país es obligatorio" });
	}
	try {
		const result = await pool.query(
			"INSERT INTO budget (name) VALUES ($1) RETURNING *",
			[name],
		);
		res.status(201).json(result.rows[0]);
	} catch (error) {
		console.error("Error al obtener presupuestos:", error);
		res.status(500).json({ error: "Error al obtener presupuestos" });
	}
};

// Actualizar un país existente
exports.updateBudget = async (req, res) => {
	const { name } = req.body;
	const Id = req.params.id;
	// Validación básica
	if (!name) {
		return res.status(400).json({ error: "El nombre es obligatorio" });
	}
	try {
		// Verificar si el país existe
		const checkResult = await pool.query(
			"SELECT * FROM budget WHERE id = $1",
			[Id],
		);
		if (checkResult.rows.length === 0) {
			return res.status(404).json({ error: "País no encontrado" });
		}
		// Actualizar el país
		const updateResult = await pool.query(
			"UPDATE budget SET name = $1 WHERE id = $2 RETURNING *",
			[name, Id],
		);
		res.json(updateResult.rows[0]);
	} catch (error) {
		console.error("Error al obtener presupuestos:", error);
		res.status(500).json({ error: "Error al obtener presupuestos" });
	}
};
// Eliminar un país
exports.deleteBudget = async (req, res) => {
	const Id = req.params.id;
	try {
		// Verificar si el país existe
		const checkResult = await pool.query(
			"SELECT * FROM budget WHERE id = $1",
			[Id],
		);
		if (checkResult.rows.length === 0) {
			return res.status(404).json({ error: "Presupuesto no encontrado" });
		}
		// Eliminar el país
		await pool.query("DELETE FROM budget WHERE id = $1", [Id]);
		res.json({ message: "Presupuesto eliminado" });
	} catch (error) {
		console.error("Error al obtener presupuestos:", error);
		res.status(500).json({ error: "Error al obtener presupuestos" });
	}
};
