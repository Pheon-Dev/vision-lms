import React from 'react';

const WarningModal = ({title, message}) => {
  return (
    <>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{title}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
    {message}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-toggle="modal">Generate New One</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default WarningModal;

