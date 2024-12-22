import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { reset, saveAccountSettings } from './settings.reducer';

const daysOfWeek = ['L', 'M', 'X', 'J', 'V'];
const hours = [8, 10, 12, 14, 18, 20];

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const successMessage = useAppSelector(state => state.settings.successMessage);

  const [permission, setPermission] = useState(() => {
    return JSON.parse(localStorage.getItem('permission')) || false;
  });

  const [availabilities, setAvailabilities] = useState(() => {
    const availabilityMap =
      JSON.parse(localStorage.getItem('availabilities')) || {};
    daysOfWeek.forEach(day => {
      if (!availabilityMap[day]) {
        availabilityMap[day] = [];
      }
    });
    return availabilityMap;
  });

  useEffect(() => {
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
  }, []);

  const handleValidSubmit = values => {
    // Guardar cambios del formulario
    const updatedAccount = {
      ...account,
      ...values,
      permission,
      availabilities: daysOfWeek.map(day => ({
        day,
        hours: availabilities[day] || [],
      })),
    };

    // Actualizar Redux y localStorage
    dispatch(saveAccountSettings(updatedAccount));
    localStorage.setItem('permission', JSON.stringify(permission));
    localStorage.setItem('availabilities', JSON.stringify(availabilities));

    // Mostrar un único mensaje de éxito
    toast.success('¡Cambios guardados exitosamente!');
  };

  const toggleAvailability = (day, hour) => {
    setAvailabilities(prev => {
      const dayHours = new Set(prev[day] || []);
      if (dayHours.has(hour)) {
        dayHours.delete(hour);
      } else {
        dayHours.add(hour);
      }
      return { ...prev, [day]: Array.from(dayHours) };
    });
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="settings-title">
            Ajustes del usuario [<strong>{account.login}</strong>]
          </h2>
          <ValidatedForm
            id="settings-form"
            onSubmit={handleValidSubmit}
            defaultValues={account}
          >
            <ValidatedField
              name="firstName"
              label="Nombre"
              id="firstName"
              placeholder="Su nombre"
              validate={{
                required: {
                  value: true,
                  message: 'Se requiere que ingrese su nombre.',
                },
                minLength: {
                  value: 1,
                  message:
                    'Se requiere que su nombre tenga por lo menos 1 caracter',
                },
                maxLength: {
                  value: 50,
                  message: 'Su nombre no puede tener más de 50 caracteres',
                },
              }}
              data-cy="firstname"
            />
            <ValidatedField
              name="lastName"
              label="Apellidos"
              id="lastName"
              placeholder="Sus apellidos"
              validate={{
                required: {
                  value: true,
                  message: 'Se requiere que ingrese sus apellidos.',
                },
                minLength: {
                  value: 1,
                  message:
                    'Se requiere que sus apellidos tengan por lo menos 1 caracter',
                },
                maxLength: {
                  value: 50,
                  message: 'Sus apellidos no pueden tener más de 50 caracteres',
                },
              }}
              data-cy="lastname"
            />
            <ValidatedField
              name="email"
              label="Correo electrónico"
              placeholder="Su correo electrónico"
              type="email"
              validate={{
                required: {
                  value: true,
                  message: 'Se requiere un correo electrónico.',
                },
                minLength: {
                  value: 5,
                  message:
                    'Se requiere que su correo electrónico tenga por lo menos 5 caracteres',
                },
                maxLength: {
                  value: 254,
                  message:
                    'Su correo electrónico no puede tener más de 50 caracteres',
                },
                validate: v =>
                  isEmail(v) || 'Su correo electrónico no es válido.',
              }}
              data-cy="email"
            />

            <div className="form-section mt-5">
              <h4 className="mb-4">Preferencias</h4>
              <div className="form-check form-switch">
                <label
                  className="form-check-label fs-5"
                  htmlFor="permissionToggle"
                >
                  ¿Permitir que suban fotos tuyas?
                </label>
                <input
                  id="permissionToggle"
                  type="checkbox"
                  className="form-check-input"
                  checked={permission}
                  onChange={e => setPermission(e.target.checked)}
                />
              </div>
            </div>

            <div className="form-section mt-5">
              <h4 className="mb-4">Disponibilidad</h4>
              <div className="availability-grid">
                {daysOfWeek.map(day => (
                  <div
                    key={day}
                    className="availability-row d-flex align-items-center mb-3"
                  >
                    <span className="day-label fw-bold me-3">{day}</span>
                    {hours.map(hour => (
                      <button
                        key={hour}
                        type="button"
                        className={`availability-cell btn ${
                          availabilities[day]?.includes(hour)
                            ? 'btn-success'
                            : 'btn-outline-secondary'
                        } me-2`}
                        onClick={() => toggleAvailability(day, hour)}
                      >
                        {hour}-{hour + 2}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-5">
              <Button color="primary" type="submit" size="lg" data-cy="submit">
                Guardar Cambios
              </Button>
            </div>
          </ValidatedForm>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;
