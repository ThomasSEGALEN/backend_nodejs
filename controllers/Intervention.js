const Intervention = require('../models/Intervention');

const createIntervention = (req, res, next) => {
    delete req.body._id;
    const intervention = new Intervention({
        ...req.body,
    });

    intervention
        .save()
        .then(() => res.status(201).json({ success: 'Intervention enregistrée' }))
        .catch((error) => res.status(400).json({ error }));
}

const getInterventions = (req, res, next) => {
    Intervention.find()
        .then((interventions) => res.status(200).json(interventions))
        .catch((error) => res.status(400).json({ error }));
}

const getAllInterventions = (req, res, next) => {
    Intervention.find()
        .then((interventions) => res.status(200).json(interventions))
        .catch((error) => res.status(400).json({ error }));
}

const deleteIntervention = (req, res, next) => {
    Intervention.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ success: 'Intervention supprimée' }))
        .catch((error) => res.status(400).json({ message: "Ce n'est pas votre intervention" }));
}

module.exports = { createIntervention, getInterventions, getAllInterventions, deleteIntervention };
