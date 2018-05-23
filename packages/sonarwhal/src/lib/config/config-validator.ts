/**
 * @fileoverview Validates that a given configuration is fully valid in terms
 * of schema and options.
 */

/*
 * ------------------------------------------------------------------------------
 * Requirements
 * ------------------------------------------------------------------------------
 */

import { readJSONSync } from 'fs-extra';

import { validate } from '../utils/schema-validator';
import { debug as d } from '../utils/debug';
import { UserConfig } from '../types';
import * as logger from '../utils/logging';

const debug = d(__filename);
// Can't have a variable for the path because webpack complains otherwise
const schema = process.env.webpack ? // eslint-disable-line no-process-env
    require('./config-schema.json') :
    readJSONSync('./config-schema.json');

/*
 * ------------------------------------------------------------------------------
 * Public
 * ------------------------------------------------------------------------------
 */

/** Validates that a given config object is valid */
export const validateConfig = (config: UserConfig): boolean => {

    debug('Validating configuration');
    if (!validate(schema, config).valid) {
        logger.error('Configuration schema is not valid');

        return false;
    }

    return true;
};
