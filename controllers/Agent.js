const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Agent = require('../models/Agent');

const register = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hashPassword) => {
            const agent = new Agent({
                numAgent: req.body.numAgent,
                grade: req.body.grade,
                password: hashPassword,
            });

            agent.save()
                .then(() => {
                    res.status(201).json(agent._id);
                })
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

const login = (req, res, next) => {
    Agent.findOne({ numAgent: req.body.numAgent, grade: req.body.grade })
        .then((agent) => {
            if (!agent)
                return res
                    .status(401)
                    .json({ message: 'Agent introuvable' });

            bcrypt.compare(req.body.password, agent.password).then((valid) => {
                if (!valid)
                    return res
                        .status(401)
                        .json({ message: 'Agent introuvable' });

                res.status(200).json({
                    numAgent: agent.numAgent,
                    token: jwt.sign(
                        { agentId: agent._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    ),
                });
            });
        })
        .catch((error) => res.status(400).json({ error }));
};

const updateAgent = (req, res, next) => {
    Agent.updateOne(
        { _id: req.params.id, numAgent: req.params.numAgent },
        { ...req.body, grade: req.body.grade }
    )
        .then(() => res.status(200).json({ success: 'Agent modifié' }))
        .catch(() => res.status(400).json({ message: 'Pas autorisé' }));
};

module.exports = { register, login, updateAgent };
