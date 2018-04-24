class CustomersController < ApplicationController

  PAGE_SIZE = 10 #customers by page

  def ng
    @base_url = "/customers/ng"
  end

  def show
    customer_detail = CustomerDetail.find(params[:id])
    respond_to do |format|
      format.json { render json: { customer: customer_detail } }
    end
  end

  def index
    @page = (params[:page] || 0).to_i
    if params[:keywords].present?
      @keywords = params[:keywords]
      customer_search_term = CustomerSearchTerm.new(@keywords)
      @customers = Customer.where(
        customer_search_term.where_clause,
        customer_search_term.where_args).
        order(customer_search_term.order).
        offset(PAGE_SIZE * @page).limit(PAGE_SIZE)
    else
      @customers = []
    end

    respond_to do |format|
      format.html {
        redirect_to "/customers/ng"
      }
      format.json {
        render json:{ customers: @customers }
      }
    end
  end

  def update
    customer_detail = CustomerDetail.find(params[:id])
    customer_detail.update(params)
    head :ok
  end
end
