function templateVerifyEmail(user, urlConfirm) {
  const template =
`<td class="esd-stripe" align="center">
  <table
    class="es-content-body"
    style="background-color: transparent"
    width="600"
    cellspacing="0"
    cellpadding="0"
    bgcolor="transparent"
    align="center"
  >
    <tbody>
      <tr>
        <td
          class="esd-structure es-p25t"
          style="background-position: center top"
          align="left"
        >
          <table width="100%" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td
                  class="esd-container-frame"
                  width="600"
                  valign="top"
                  align="center"
                >
                  <table width="100%" cellspacing="0" cellpadding="0">
                    <tbody>
                      <tr>
                        <td
                          class="esd-block-image"
                          align="center"
                          style="font-size: 0px"
                        >
                          <a target="_blank" href="https://clens.netlify.app/"
                            ><img
                              class="adapt-img"
                              src="https://demo.stripocdn.email/content/guids/99eb2aba-8131-44d7-8fa0-be4d7e3de407/images/logoclens_smq.jpg"
                              alt="www.clens.com"
                              style="display: block"
                              width="100"
                              title="www.clens.com"
                          /></a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td
          class="esd-structure es-p20r es-p20l"
          style="background-position: center top; background-color: #ffffff"
          bgcolor="#ffffff"
          align="left"
        >
          <table width="100%" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td
                  class="esd-container-frame"
                  width="560"
                  valign="top"
                  align="center"
                >
                  <table
                    style="
                      background-position: center bottom;
                      background-color: transparent;
                    "
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    bgcolor="transparent"
                  >
                    <tbody>
                      <tr>
                        <td
                          class="esd-block-text es-p10t es-p5b"
                          bgcolor="transparent"
                          align="left"
                        >
                          <h3 style="color: #2980d9">
                            Hola ${user.firstName} ${user.lastName},
                          </h3>
                        </td>
                      </tr>
                      <tr>
                        <td
                          class="esd-block-text es-p10t"
                          bgcolor="transparent"
                          align="left"
                        >
                          <p>Gracias por registrarte en CLENS</p>
                        </td>
                      </tr>
                      <tr>
                        <td
                          class="esd-block-text es-p5t es-p5b"
                          bgcolor="transparent"
                          align="left"
                        >
                          <p>El mejor servicio al mejor precio</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td
          class="esd-structure"
          style="background-position: center bottom"
          align="left"
        >
          <table width="100%" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td
                  class="esd-container-frame"
                  width="600"
                  valign="top"
                  align="center"
                >
                  <table
                    style="
                      background-position: center bottom;
                      background-color: #ffffff;
                      border-radius: 0px 0px 5px 5px;
                      border-collapse: separate;
                    "
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    bgcolor="#ffffff"
                  >
                    <tbody>
                      <tr>
                        <td
                          class="esd-block-spacer"
                          height="15"
                          align="center"
                        ></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td
          class="esd-structure es-p20r es-p20l"
          style="background-position: center bottom"
          align="left"
        >
          <table width="100%" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td
                  class="esd-container-frame"
                  width="560"
                  valign="top"
                  align="center"
                >
                  <table width="100%" cellspacing="0" cellpadding="0">
                    <tbody>
                      <tr>
                        <td
                          class="esd-block-spacer"
                          height="10"
                          align="center"
                        ></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td
          class="esd-structure"
          style="background-position: center bottom"
          align="left"
        >
          <table width="100%" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td
                  class="esd-container-frame"
                  width="600"
                  valign="top"
                  align="center"
                >
                  <table
                    style="
                      background-position: center bottom;
                      background-color: #ffffff;
                      border-radius: 5px 5px 0px 0px;
                      border-collapse: separate;
                    "
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    bgcolor="#ffffff"
                  >
                    <tbody>
                      <tr>
                        <td
                          class="esd-block-spacer"
                          height="16"
                          align="center"
                        ></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td
          class="esd-structure es-p20r es-p20l"
          style="background-position: center bottom; background-color: #ffffff"
          bgcolor="#ffffff"
          align="left"
        >
          <table width="100%" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td
                  class="esd-container-frame"
                  width="560"
                  valign="top"
                  align="center"
                >
                  <table width="100%" cellspacing="0" cellpadding="0">
                    <tbody>
                      <tr>
                        <td
                          class="esd-block-text es-p5t es-p10b"
                          bgcolor="transparent"
                          align="left"
                        >
                          <p>Despues de confirmar tu correo electronico</p>
                        </td>
                      </tr>
                      <tr>
                        <td
                          class="esd-block-text es-p5t es-p5b"
                          bgcolor="transparent"
                          align="left"
                        >
                          <p style="font-size: 16px">Tendras acceso a:</p>
                        </td>
                      </tr>
                      <tr>
                        <td
                          class="esd-block-text es-p5b es-p5r es-p5l"
                          bgcolor="transparent"
                          align="left"
                        >
                          <p style="line-height: 200%; color: #666666">
                            <span style="color: #2980d9">►</span>&nbsp;Todos
                            nuestros servicios
                          </p>
                          <p style="line-height: 200%; color: #666666">
                            <span style="color: #2980d9">►</span>&nbsp;Agendar
                            servicios en la fecha que desees
                          </p>
                          <p style="line-height: 200%; color: #666666">
                            <span style="color: #2980d9">►</span>&nbsp;Ver tu
                            historial de servicios
                          </p>
                          <p style="line-height: 200%; color: #666666">
                            <span style="color: #2980d9">►</span>&nbsp;Contactar
                            directamente con el equipo de soporte&nbsp;
                          </p>
                          <p style="line-height: 200%; color: #666666">
                            <br />
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td
                          class="esd-block-text es-p10t es-p5b"
                          bgcolor="transparent"
                          align="center"
                        >
                          <p style="color: #77c6ca">
                            <strong
                              >Confirma tu correo haciendo clic al siguiente
                              enlace</strong
                            >
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  class="esd-container-frame"
                  width="560"
                  valign="top"
                  align="center"
                >
                  <br />
                </td>
              </tr>
              <tr>
                <td
                  class="es-m-p20b esd-container-frame"
                  width="560"
                  align="left"
                >
                  <table width="100%" cellspacing="0" cellpadding="0">
                    <tbody>
                      <tr>
                        <td
                          class="esd-block-button es-p10t es-p10b"
                          align="center"
                        >
                          <span
                            class="es-button-border"
                            style="background: #77c6ca"
                          >
                            <a
                              href="${urlConfirm}"
                              class="es-button es-button-1642564237440"
                              target="_blank"
                              style="
                                border-width: 10px 40px;
                                background: #77c6ca;
                                border-color: #77c6ca;
                              "
                              >HAZ CLIC AQUI PARA CONFIRMAR</a
                            >
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td
          class="esd-structure"
          style="background-position: center bottom"
          align="left"
        >
          <table width="100%" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td
                  class="esd-container-frame"
                  width="600"
                  valign="top"
                  align="center"
                >
                  <table
                    style="
                      background-position: center bottom;
                      background-color: #ffffff;
                      border-radius: 0px 0px 5px 5px;
                      border-collapse: separate;
                    "
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    bgcolor="#ffffff"
                  >
                    <tbody>
                      <tr>
                        <td
                          class="esd-block-spacer"
                          height="32"
                          align="center"
                        ></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</td>`
  return template
}

module.exports = {
  templateVerifyEmail
}
