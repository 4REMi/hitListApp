export function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5);'
    modal.style.zIndex = '1000';
    modal.style.backgroundColor = '#00000091';

    

  
  

}

export function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}