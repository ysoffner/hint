/**
 * @fileoverview Exports all the actions the CLI is capable of doing.
 */
import { CLIOptions } from '../types';

/** Wrapper to dynamically load the different CLI tasks depending on a condition */
const action = (pkg: Promise<any>, condition?: string): (actions: CLIOptions) => Promise<boolean> => {
    return async (options: CLIOptions): Promise<boolean> => {
        if (!condition || options[condition]) {
            const { default: task }: any = await pkg;

            return await task(options);
        }

        return false;
    };
};

/** All the action handlers for the CLI. */
export const cliActions: Array<(action: CLIOptions) => Promise<boolean>> =
    [
        action(import(/* webpackChunkName: 'new-rule' */'./wizards/new-rule'), 'newRule'),
        action(import(/* webpackChunkName: 'new-parser' */'./wizards/new-parser'), 'newParser'),
        action(import(/* webpackChunkName: 'init' */'./wizards/init'), 'init'),
        action(import(/* webpackChunkName: 'version' */'./version'), 'version'),
        action(import(/* webpackChunkName: 'analyze' */'./analyze'), '_'),
        action(import(/* webpackChunkName: 'help' */'./help'))
    ];
