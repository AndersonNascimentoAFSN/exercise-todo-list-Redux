import React from 'react';
import { fireEvent, getDefaultNormalizer, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando a aplicação, testando input', () => {
  it('Verificando se o label e o input existem no documento', () => {
    const { getByLabelText, getByText } = render(<App />)
    const inputTask = getByLabelText('Tarefa:');
    const labelTask = getByText('Tarefa:');
    expect(labelTask).toBeInTheDocument();
    expect(inputTask).toBeInTheDocument();
  });
    
  it('Verificando o tipo do input', () => {
    const { getByLabelText } = render(<App />)
    const inputTask = getByLabelText('Tarefa:');
    expect(inputTask.type).toBe('text');
  });
  
  it('Verificando a existência do botão "Adicionar"', () => {
    const { getByRole } = render(<App />)
    const btnTask = getByRole('button', { name: 'Adicionar'});
    expect(btnTask).toBeInTheDocument();
  });

  it('Verificando se a tarefa é salva após clicar no botão', () => {
    const { getByRole, getByLabelText, getByTestId, queryByText, getByText, debug } = render(<App />)

    const inputTask = getByLabelText('Tarefa:');
    userEvent.type(inputTask, '  Tomar café');
    // expect(inputTask).toHaveValue('Tomar café');

    expect(queryByText('Tomar café')).not.toBeInTheDocument();

    const btnTask = getByRole('button', { name: 'Adicionar'});
    userEvent.click(btnTask);

    const tasks =  getByTestId('tasks');
    expect(tasks).toHaveTextContent('Tomar café');

    expect(getByText('Tomar caf', { exact: false})).toBeInTheDocument();
    expect(getByText('Tomar café', { normalizer: getDefaultNormalizer({ trim: true })})).toBeInTheDocument();

    debug(getByText('Tomar café'));
  });

});
  