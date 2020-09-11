import diagnoses from '../data/diagnoses.json'
import { Diagnose } from '../types'

const getAll = ():Diagnose[] => diagnoses

export default {
    getAll
}
